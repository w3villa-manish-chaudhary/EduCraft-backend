const express = require('express');
const router = express.Router();
const {addcourse , showallcourse} = require('../controllers/course/addAndShowCourse')


router.post('/addcourse', addcourse);
router.get('/showallcourse', showallcourse);




module.exports = router;