const express = require('express');
const router = express.Router();


const AuthenticationRoute = require('../api/authentication');
const DashboardRoute = require('./dashboard');
const Test= require('./test');


router.use('/authentication', AuthenticationRoute);
router.use('/dashboard', DashboardRoute);
router.use('/test', Test);

module.exports = router;