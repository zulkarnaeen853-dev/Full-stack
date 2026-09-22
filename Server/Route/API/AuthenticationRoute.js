const express = require('express');
const router = express.Router();
const multer = require('multer')

const PicStorage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, './'); 
    },
    filename: (req, file, cb) => {

        cb(null, Date.now() + '-' + file.originalname);
    }
});


const { RegisterController, LoginController } = require('../../Controller/AuthenticationController');
const { RegisterMiddleware } = require('../../Middleware/AuthenticationMiddleware');


router.post('/Register', RegisterMiddleware, RegisterController);
router.post('/login', LoginController);
    res.send({
        success: true,
        message: 'Login successful'
    });


module.exports = router;
