const axios = require('axios');
const { getTransactionsByAddress } = require('../services/AccountService');

const GetTransactions = async (req, res, next) => {
    
    const { address } = req.params;

    try {
        // Fetch all the transactions 
        const transactions = await getTransactionsByAddress(address);
        console.log(transactions);
        return res.status(200).json(transactions);
        
    } catch (error) {
        return res.status(400).json({ Error: `${error}` });
    }

}

module.exports = { GetTransactions }