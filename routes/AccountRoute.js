const express = require('express');
const { GetTransactions, GetExpense } = require('../controllers/AccountController');
const router = express.Router();

router.get('/transactions/:address', GetTransactions);

router.get('/expense/:address', GetExpense);

module.exports = router;