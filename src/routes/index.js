const express = require('express');
const router = express.Router();
const hello = require('../controllers/index');

router.get('/', hello);

module.exports = router;

