const express = require('express');
const router = express.Router();
const multer = require('multer')

const PicStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Uploads'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: PicStorage });


const { RegisterController, LoginController } = require('../../controller/authenticatio');
const { RegisterMiddleware } = require('../../middleware/authentication');


router.post('/register', upload.single('UserPhoto'), RegisterMiddleware, RegisterController);
router.post('/login', LoginController);
    


module.exports = router;
