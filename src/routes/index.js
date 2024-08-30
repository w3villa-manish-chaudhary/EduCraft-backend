const express = require('express');
const router = express.Router();

const hello = require('../controllers/index');
const { createUser  } = require('../controllers/auth/signup');
const { signin } = require('../controllers/auth/signin');
const fetchByUniqueId  = require('../controllers/getUniqueId/uniqueId.conrollers');
const otpVerify = require('../controllers/auth/otpVerify');
const emailVerify = require('../controllers/auth/emailVerify');
const authRoutes = require('./googleAuth');
const courseRoutes = require('./courseRoute')
const profileRoutes = require('./profileRoute')
const getProfile = require('../controllers/auth/getProfile');
const tokenDecorator = require('../middlewares/auth.middleware');

router.get('/', hello);
router.post('/signup', createUser);
router.post('/signin', signin);
router.get('/users/:uniqueId', fetchByUniqueId);
router.post('/otpverify', otpVerify);
router.post('/emailverify', emailVerify);
router.use('/auth', authRoutes);
router.use('/course', courseRoutes);
router.use('/profile', tokenDecorator, profileRoutes);
router.get('/user/profile', tokenDecorator, getProfile);

module.exports = router;

