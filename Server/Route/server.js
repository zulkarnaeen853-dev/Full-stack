const express = require('express');
const router = express.Router();



const api = process.env.BASE_URL || `/api/v1`;

const API = require('./API/server');

router.use(api, API);


router.use(api ,(req, res) => {
    res.status(404).json({ success: false, message: "No api route has been found" });
});

module.exports = router;