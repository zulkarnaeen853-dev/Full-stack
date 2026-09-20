const express = require('express');
const router = express.Router();

/controllers/
const DataController = require('../../Controller/DataController');
const RegisterController = require('../../Controller/RegisterController');
const UpdateController = require('../../Controller/UpdateController');
const DeleteController = require('../../Controller/DeleteController');

/middleware/
const RegisterMiddleware = require('../../Middleware/RegisterMiddleware');




router.get('/Data', DataController);
router.post('/Register', RegisterMiddleware, RegisterController);
router.delete('/delete/:id', DeleteController);
router.post('/update/:id', UpdateController);

module.exports = router;