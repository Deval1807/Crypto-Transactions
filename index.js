const express = require('express');
require('dotenv').config();
const ConnectDB = require('./config/Database');
const { FetchEthPrice, FetchEthPriceEvery10Mins } = require('./services/CryptoService');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

ConnectDB();

// Fetch every 10 mins
FetchEthPriceEvery10Mins();

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api', require('./routes')) ;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));