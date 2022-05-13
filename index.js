require("dotenv").config({ path: "./env/.env" });
const port = process.env.PORT;
const express = require('express');
const app = express();
var cors = require('cors')
const bodyParser = require('body-parser');
require('./database/setup')
const dotenv = require('dotenv');

dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())
app.use(express.json());


const apiRouter = require('./routes/api');
app.use('/api',apiRouter);



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});