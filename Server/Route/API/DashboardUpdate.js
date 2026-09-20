const express = require('express');
const router = express.Router();


const UpdateController = require('../../Controller/UpdateController');



router.post('/update/:id', UpdateController);

module.exports = router;