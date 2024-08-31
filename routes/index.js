const express = require('express');
const router = express.Router(); 

// All different route-modules
router.use('/account', require('./AccountRoute'))

module.exports = router;