const axios = require('axios');
const { getTransactionsByAddress } = require('../services/AccountService');
const Transaction = require('../models/Transaction');

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
        return res.status(400).json({ Error: `${error}` });
    }

}

module.exports = { GetTransactions }