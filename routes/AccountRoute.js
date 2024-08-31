const express = require('express');
const { GetTransactions } = require('../controllers/AccountController');
const router = express.Router();

router.get('/transactions/:address', GetTransactions);

module.exports = router;