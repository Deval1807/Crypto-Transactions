const express = require('express');
require('dotenv').config();
const ConnectDB = require('./config/Database');
const { fetchEthPriceEvery10Mins } = require('./services/CryptoService');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

// Connect to the Database
ConnectDB();

// Fetch ethereum price every 10 mins
fetchEthPriceEvery10Mins();

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api', require('./routes')) ;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));