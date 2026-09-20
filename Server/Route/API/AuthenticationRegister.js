const express = require('express');
const router = express.Router();


const upload = require('../../config/multerConfig');
const RegisterController = require('../../Controller/RegisterController');
const RegisterMiddleware = require('../../Middleware/RegisterMiddleware');



router.post('/Register', RegisterMiddleware, upload.single('avatar'), RegisterController);

module.exports = router;