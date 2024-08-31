const express = require('express');
require('dotenv').config();
const ConnectDB = require('./config/Database');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

ConnectDB();

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api', require('./routes')) ;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));