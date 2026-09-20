const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);


require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");


const Router = require('./Route/server');


const app = express();
const port = process.env.PORT || 3000 ;

app.use(cors());
app.use(express.json());
app.use(Router);





mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log('🎉 Database connected successfully!');
  })
  .catch((err) => {
    console.log('❌ Database connection failed:', err.message);
  });


app.listen(port, () => {
  console.log(`server is running on port:${port}`);
});
