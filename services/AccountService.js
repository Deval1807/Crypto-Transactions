const axios = require('axios');
const Transaction = require('../models/Transaction');

const getTransactionsByAddress = async (address) => {
    const api_token = process.env.ETHERSCAN_API_TOKEN
    const etherscan_url = process.env.ETHERSCAN_NORMAL_TRANSACTIONS_URL
    try {
        const response = await axios.get(etherscan_url, {
            params: {
                module: 'account',
                action: 'txlist',
                address: address,
                startblock: 0,
                endblock: 99999999,
                page: 1,
                offset: 10,
                sort: 'asc',
                apikey: api_token
            }
        });
        return response.data.result;
    } catch (error) {
        console.error(error);        
        return error;
    }
}

const getUserTransactionsByAddress = async (address) => {
    try {
        const userTransactions = await Transaction.findOne({ address });
        return userTransactions.transactions;
    } catch (error) {
        console.error(error);
        return error;
    }
}

const calculateTotalExpense = (userTransactions) => {
    let totalExpense = 0;
    userTransactions.forEach(txn => {
        const gasUsed = parseFloat(txn.gasUsed);
        const gasPrice = parseFloat(txn.gasPrice);
        const expense = (gasUsed * gasPrice) / 1e18; // Calculate expense in Ether
        totalExpense += expense;
    });
    return totalExpense;
}

module.exports = { getTransactionsByAddress, getUserTransactionsByAddress, calculateTotalExpense }