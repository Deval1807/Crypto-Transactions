const GetTransactions = (req, res, next) => {
    const { address } = req.params;
    return res.status(200).json({ "message": `All Transactions of address ${address}` })
}

module.exports = { GetTransactions }