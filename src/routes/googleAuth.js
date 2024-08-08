const express = require('express');
const passport = require('passport');
const router = express.Router();

const googleAuth  = require('../controllers/auth/googleAuth')

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



router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;