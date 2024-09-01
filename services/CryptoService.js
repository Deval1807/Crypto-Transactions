const axios = require('axios');

const FetchEthPrice = async () => {
    const etherscan_url = process.env.ETH_PRICE_URL
    try {
        const response = await axios.get(etherscan_url, {
            params: {
                ids: 'ethereum',
                vs_currencies: 'inr'
            }
        });

        console.log("priceee: ", response.data);
        
        return response.data;
    } catch (error) {
        console.error(error);        
        return error
    }
}

const FetchEthPriceEvery10Mins = async () => {
    
    // First fetch once immediately
    FetchEthPrice();

    // Fetch after every 10 mins
    setInterval(() => {
        FetchEthPrice();
    }, 600000);
}

module.exports = { FetchEthPrice, FetchEthPriceEvery10Mins }