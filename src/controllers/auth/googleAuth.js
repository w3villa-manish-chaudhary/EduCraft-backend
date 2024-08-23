const successGoogleLogin = (req , res) => { 
	if(!req.user) 
		res.redirect('/failure'); 
    // console.log(":::::::::::::::::::",req.user);
    res.redirect(`${process.env.FRONTEND_URL}/oauthotpverify`);

}

const failureGoogleLogin = (req , res) => { 
	res.send("Error"); 
}

module.exports = {
    successGoogleLogin,
    failureGoogleLogin
}