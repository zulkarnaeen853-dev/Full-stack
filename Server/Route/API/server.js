const express = require('express');
const router = express.Router();


const AuthenticationRoute = require('./API/AuthenticationRoute');
const DashboardRoute = require('./API/DashboardRoute');
const Test = require('./API/Test');


router.use('/authenticationRoute', AuthenticationRoute);
router.use('/DashboardRoute', DashboardRoute);
router.use('/test', Test);

module.exports = router;