const express = require('express');
const router = express.Router();

// 1. FIXED: Corrected comment syntax & imported your modular Multer config

// controllers
const DataController = require('../../Controller/DataController');
const UpdateController = require('../../Controller/UpdateController');
const DeleteController = require('../../Controller/DeleteController');


router.get('/Data', DataController);
router.delete('/delete/:id', DeleteController);
router.post('/update/:id', UpdateController);

module.exports = router;
