const express = require('express');
const router = express.Router();
const { kivoSignIn , kivoCallback} = require('../controllers/kivoOauth/kivoOauth');


router.get("/signin/kivo", kivoSignIn);
router.get("/kivo/callback", kivoCallback);


module.exports = router;
