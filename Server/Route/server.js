const express = require('express');
const router = express.Router();


const AuthenticationRoute = require('./API/AuthenticationData');


const api = process.env.BASE_URL || `/api/v1`;
router.use(api, AuthenticationRoute);

router.use(api ,(req, res) => {
    res.status(404).json({ success: false, message: "No api route has been found" });
});

module.exports = router;