const express = require('express');
const router = express.Router();


const AuthenticationRoute = require('./API/AuthenticationRoute');


const api = process.env.BASE_URL || '/api';
router.use(api, AuthenticationRoute);

module.exports = router;