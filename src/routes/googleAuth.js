const express = require('express');
const passport = require('passport');
const router = express.Router();
const googleAuth = require('../controllers/auth/googleAuth');
const oauthotpsend = require('../controllers/auth/oAuthOtp');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
  })
);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
  passport.authenticate('github', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
  })
);

router.get('/success', googleAuth.successGoogleGitHubLogin);
router.get('/failure', googleAuth.failureGoogleGitHubLogin);

router.get('/login/success', googleAuth.oAuthLoginSuccess);

router.post('/oauthotpsend', oauthotpsend);
router.get('/logout', (req, res) => {
  console.log(":::::::::::>>>>>>> i am in logout <<<<<<<<<<<");


    req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }



    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }

      res.clearCookie('connect.sid');
     return res.status(200).json({ message: 'Logout successful' });
      console.log(":::::::::::>>>>>>> after req.logoutlogout <<<<<<<<<<<");
    });
  });
});
module.exports = router;
