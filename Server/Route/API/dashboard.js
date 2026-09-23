const express = require('express');
const router = express.Router();

const { UpdateController, DeleteController } = require('../../controller/dashboard');

router.delete('/delete/:id', DeleteController);
router.post('/update/:id', UpdateController);

module.exports = router;