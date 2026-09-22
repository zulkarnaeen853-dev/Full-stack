const express = require('express');
const router = express.Router();

// 1. FIXED: Corrected comment syntax & imported your modular Multer config

const { RegisterController, LoginController } = require('../../Controller/AuthenticationController');
const { RegisterMiddleware } = require('../../Middleware/AuthenticationMiddleware');


router.post('/Register', RegisterMiddleware, RegisterController);
router.post('/login', LoginController);
    res.send({
        success: true,
        message: 'Login successful'
    });


module.exports = router;
