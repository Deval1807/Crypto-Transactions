const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    address: { type: String, required: true, unique: true },
    transactions: [{
        blockNumber: {type: Number},
        blockHash: {type: String},
        timeStamp: {type: Number},
        hash: {type: String},
        nonce: {type: Number},
        transactionIndex: {type: Number},
        from: {type: String},
        to: {type: String},
        value: {type: Number},
        gas: {type: Number},
        gasPrice: {type: Number},
        input: {type: String},
        methodId: {type: String},
        functionName: {type: String},
        contractAddress: {type: String},
        cumulativeGasUsed: {type: Number},
        txreciept_status: {type: Number},
        gasUsed: {type: Number},
        confirmations: {type: Number},
        isError: {type: Number}
    }]
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;