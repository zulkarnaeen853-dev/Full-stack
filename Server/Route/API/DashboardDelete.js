const express = require('express');
const router = express.Router();


const DeleteController = require('../../Controller/DeleteController');



router.delete('/delete/:id', DeleteController);

module.exports = router;