const express = require('express');
const router = express.Router();
const {addcourse , showallcourse , fetchByUniqueId} = require('../controllers/course/addAndShowCourse')
const makepayments = require('../controllers/course/paymentCourse')
const {addSubscription,showAllSubscriptions} = require('../controllers/course/subscription')




router.post('/addcourse', addcourse);
router.get('/showallcourse', showallcourse);
router.post('/payments' , makepayments )
router.get('/:uniqueId', fetchByUniqueId);

router.post('/subscription/add', addSubscription);
router.get('/subscription/show', showAllSubscriptions);







module.exports = router;