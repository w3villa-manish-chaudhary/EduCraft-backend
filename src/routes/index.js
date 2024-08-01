const express = require('express');
const router = express.Router();


const hello = require('../controllers/index');
const { createUser  } = require('../controllers/auth/signup');
const { signin } = require('../controllers/auth/signin');




router.get('/', hello);
router.post('/signup', createUser);
router.post('/signin', signin);


module.exports = router;

