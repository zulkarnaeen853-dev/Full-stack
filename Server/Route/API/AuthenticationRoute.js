const express = require('express');
const router = express.Router();

// 1. FIXED: Corrected comment syntax & imported your modular Multer config

const { RegisterController } = require('../../Controller/TestController');
const { RegisterMiddleware } = require('../../Middleware/RegisterMiddleware');


router.post('/Register', RegisterMiddleware, RegisterController);
router.post('/login', () => {
    res.send({
        success: true,
        message: 'Login successful'
    });
});


module.exports = router;
