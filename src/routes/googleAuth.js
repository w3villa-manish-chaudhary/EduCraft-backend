const express = require('express');
const passport = require('passport');
const router = express.Router();
const googleAuth  = require('../controllers/auth/googleAuth')
const oauthotpsend = require('../controllers/auth/oAuthOtp')


router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

  


// Auth Callback 
router.get( '/google/callback', 
	passport.authenticate( 'google', { 
		successRedirect: '/auth/success', 
		failureRedirect: '/auth/failure'
}));

// Success 
router.get('/success' , googleAuth.successGoogleLogin); 


// failure 
router.get('/failure' , googleAuth.failureGoogleLogin);



//send otp after google verify
router.post('/oauthotpsend', oauthotpsend);



router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;