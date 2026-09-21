const express = require('express');
const router = express.Router();

const { UpdateController, DeleteController } = require('../../Controller/TestController');

router.delete('/delete/:id', DeleteController);
router.post('/update/:id', UpdateController);

module.exports = router;