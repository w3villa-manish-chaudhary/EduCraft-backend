const express = require('express');
const router = express.Router();


const hello = require('../controllers/index');
const { createUser  } = require('../controllers/auth/signup');
const { signin } = require('../controllers/auth/signin');
const fetchByUniqueId  = require('../controllers/getUniqueId/uniqueId.conrollers');







router.get('/', hello);
router.post('/signup', createUser);
router.post('/signin', signin);
router.get('/users/:uniqueId', fetchByUniqueId);



module.exports = router;

