const express = require('express');
const router = express.Router();

const { DataController } = require('../../controller/test');

router.get('/Data', DataController);

module.exports = router;