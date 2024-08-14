const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const axios = require('axios');
const Users = require('../database/models/user.model');
const { getLogger } = require('nodemailer/lib/shared');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});




// console.table([process.env.GITHUB_CLIENT_ID,process.env.GITHUB_CLIENT_SECRET]);
// console.error('This is an error message');
// console.warn('This is a warning message');
// console.info('This is an info message');
// console.debug('This is a debug message');
// console.trace('This is a trace message');






passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACKURL,
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const emailResponse = await axios.get('https://api.github.com/user/emails', {
      headers: { Authorization: `token ${accessToken}` }
    });

    const emails = emailResponse.data;
    const primaryEmail = emails.find(email => email.primary)?.email || null;

    profile.email = primaryEmail;

    const [user, created] = await Users.findOrCreate({
      where: { email: primaryEmail },
      defaults: {
        name: profile.displayName,
        email: primaryEmail,
        password: '0',
        isMobileVerify: false,
        isEmailVerify: true
      }
    });

    if (created) {
      console.log('New user created:', user.toJSON());
    } else {
      console.log('Existing user found:', user.toJSON());
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACKURL,
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

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
