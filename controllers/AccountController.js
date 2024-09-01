const axios = require('axios');
const { getTransactionsByAddress,
        getUserTransactionsByAddress,
        calculateTotalExpense
} = require('../services/AccountService');
const Transaction = require('../models/Transaction');
const { fetchEthPrice } = require('../services/CryptoService');

const GetTransactions = async (req, res, next) => {
    
    const { address } = req.params;

    try {
        // Fetch all the transactions 
        const transactions = await getTransactionsByAddress(address);

        // Update the DB
        // Check if the address already exists
        const existingAddressTxns = await Transaction.findOne({ address });

        if(existingAddressTxns) {
            // check for duplicates and then append
            
            // Find the existing transactions hashes
            const existingTxnsHashes = new Set(existingAddressTxns.transactions.map(txn => txn.hash));

            // only keep those transactions who are not present already
            const newTransactions = transactions.filter(txn => !existingTxnsHashes.has(txn.hash));

            if(newTransactions.length > 0) {
                existingAddressTxns.transactions.push(...newTransactions);
                await existingAddressTxns.save();
                console.log("DB updated successfully");
            }else {
                console.log("No new transactions to add in the Db");
            }
            
        }else {
            // Create a new transaction with this address
            await Transaction.create({
                address,
                transactions
            });       
            console.log(`New Document added in DB for the address ${address}`); 
        }

        // return the transactions of the user
        return res.status(200).json(transactions);
        
    } catch (error) {
        console.error(error);
        return res.status(400).json({ Error: `${error}` });
    }

}

const GetExpense = async (req, res, next) => {
    
    const { address } = req.params;

    try {

        const userTransactions = await getUserTransactionsByAddress(address);
        if(!userTransactions) {
            return res.status(400).json({ message: "No transactions found with this address" });
        }

        const totalExpense = calculateTotalExpense(userTransactions);

        const currentEtherPrice = await fetchEthPrice();

        return res.status(200).json({ 
            "Totan Expense": totalExpense,
            "Current Ether Price": currentEtherPrice 
        })

    } catch (error) {
        console.error(error);
        return res.status(400).json({ Error: `${error}` });
    }

}

module.exports = { GetTransactions, GetExpense }