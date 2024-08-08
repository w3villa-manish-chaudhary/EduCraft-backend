const express = require('express');
const router = express.Router();


const hello = require('../controllers/index');
const { createUser  } = require('../controllers/auth/signup');
const { signin } = require('../controllers/auth/signin');
const fetchByUniqueId  = require('../controllers/getUniqueId/uniqueId.conrollers');
const otpVerify = require('../controllers/auth/otpVerify');
const emailVerify = require('../controllers/auth/emailVerify');
const authRoutes = require('./googleAuth');




router.get('/', hello);
router.post('/signup', createUser);
router.post('/signin', signin);
router.get('/users/:uniqueId', fetchByUniqueId);
router.post('/otpverify', otpVerify);
router.post('/emailverify', emailVerify);
router.use('/auth', authRoutes);



module.exports = router;

