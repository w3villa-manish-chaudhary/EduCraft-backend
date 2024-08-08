const passport = require('passport'); 
const GoogleStrategy = require('passport-google-oauth20').Strategy; 

passport.serializeUser((user , done) => { 
	done(null , user); 
}) 
passport.deserializeUser(function(user, done) { 
	done(null, user); 
}); 


passport.use(new GoogleStrategy({ 
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACKURL, 
	passReqToCallback:true
}, 
function(request, accessToken, refreshToken, profile, done) { 
	// console.log("profile::::::::::::", profile)
	
			   console.log("accessToken:>>>", accessToken);
			   console.log("Last Name:>>>", profile.name.givenName);
			   

	return done(null, profile); 

} 
));