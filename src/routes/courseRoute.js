const express = require('express');
const router = express.Router();
const {addcourse , showallcourse} = require('../controllers/course/addAndShowCourse')
const makepayments = require('../controllers/course/paymentCourse')




router.post('/addcourse', addcourse);
router.get('/showallcourse', showallcourse);
router.post('/payments' , makepayments )




module.exports = router;