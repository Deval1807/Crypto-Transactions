const axios = require('axios');

const getTransactionsByAddress = async(address) => {
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

module.exports = { getTransactionsByAddress }