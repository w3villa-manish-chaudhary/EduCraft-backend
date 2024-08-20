const express = require('express');
const router = express.Router();
const addcourse = require('../controllers/course/addcourse')


router.post('/addcourse', addcourse);


module.exports = router;