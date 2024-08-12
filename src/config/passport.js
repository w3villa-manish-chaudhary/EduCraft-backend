const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Users = require('../database/models/user.model');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACKURL,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const [user, created] = await Users.findOrCreate({
          where: { email: profile.emails[0].value },
          defaults: {
            name: profile.displayName,
            email: profile.emails[0].value,
            password: '0', 
            isMobileVerify: false,
            isEmailVerify: true, 
          },
        });

        if (created) {
          console.log('New user created:', user.toJSON());
        } else {
          console.log('User already exists:', user.toJSON());
        }

        return done(null, profile);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);