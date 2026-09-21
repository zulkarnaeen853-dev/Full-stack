const express = require('express');
const router = express.Router();

// 1. FIXED: Corrected comment syntax & imported your modular Multer config

const { DataController, RegisterController, UpdateController, DeleteController } = require('../../Controller/Test');
const RegisterMiddleware = require('../../Middleware/RegisterMiddleware');

router.get('/Data', DataController);
router.post('/Register', RegisterMiddleware, RegisterController);
router.delete('/delete/:id', DeleteController);
router.post('/update/:id', UpdateController);

module.exports = router;
