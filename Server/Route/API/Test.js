const express = require('express');
const router = express.Router();

const { DataController } = require('../../Controller/TestController');

router.get('/Data', DataController);

module.exports = router;