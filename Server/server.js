const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);


require('dotenv').config();
const express = require("express");
const cors = require("cors");

const Router = require('./Route/server');
const dbConnection = require('./Configuration/dbConnection');


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(Router);





dbConnection();

app.listen(port, () => {
  console.log(`server is running on port:${port}`);
});
