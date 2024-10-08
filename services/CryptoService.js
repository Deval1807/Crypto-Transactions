const axios = require('axios');
const Crypto = require('../models/Crypto');

/**
 * Function to Fetch Ethereum Price
 * NOTE: We can also generalize this function by passing the crypto name(ethereum) and currency(inr) as arguments
 */
const fetchEthPrice = async () => {
    const api_token = process.env.ETHERSCAN_API_TOKEN
    const etherscan_url = process.env.ETHERSCAN_URL
    try {
        const response = await axios.get(etherscan_url, {
            params: {
                module: 'stats',
                action: 'ethprice',
                apikey: api_token
            }
        });
        return response.data.result.ethusd;
    } catch (error) {
        console.error(error);        
        return error
    }
}

/**
 * Function the fetch the price of ethereum every 10 minutes
 */
const fetchEthPriceEvery10Mins = async () => {
    
    // First fetch once immediately
    const price = await fetchEthPrice();
    await updateEthereumPriceDB(price);

    // Fetch after every 10 mins
    setInterval(async () => {
        const price = await fetchEthPrice();
        await updateEthereumPriceDB(price);
    }, 600000);
}

/**
 * Helper function to update the DB after fetching the ethereum price
 */
const updateEthereumPriceDB = async (price) => {
    try {
        // Check a document exists for ethereum or not
        let ethPrice = await Crypto.findOne({ name: 'Ethereum' });

        if(ethPrice) {
            // If exists, push the new price
            ethPrice.pricingInfo.push({
                price: price,
                currency: 'USD',
                fetchedAt: new Date()
            });

            await ethPrice.save();

            console.log("Ethereum Price document updated");
            
        }else {
            // Add a new document for ethereum
            await Crypto.create({
                name: 'Ethereum',
                pricingInfo: [{
                    price,
                    currency: 'USD',
                    fetchedAt: new Date()
                }]
            });

            console.log("New document added for Ethereum in the Database");
            
        } 
    } catch (error) {
        console.error(error);        
        return error
    }
}

module.exports = { fetchEthPrice, fetchEthPriceEvery10Mins }