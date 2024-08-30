const express = require('express');
const router = express.Router();
const { getUserProfile , updateUserProfile } = require('../controllers/profile/profile')




router.get('/myprofile', getUserProfile);
router.put('/updateprofile', updateUserProfile);







module.exports = router;