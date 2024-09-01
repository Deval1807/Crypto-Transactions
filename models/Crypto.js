const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,       // e.g.: 'ethereum', 'bitcoin (to generalise the schema for multiple crypto currencies)
        required: true      // store the crypto only once to reduce the redundancy
    },
    pricingInfo: [{
        price: {
            type: Number,
            required: true
        },
        currency: {
            type: String, // e.g.: 'INR', 'USD'
            required: true,
            default: 'INR'
        },
        fetchedAt: {
            type: Date,
            required: true,
            default: Date.now
        }
    }]
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;