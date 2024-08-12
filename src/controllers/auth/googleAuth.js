const successGoogleLogin = (req , res) => { 
	if(!req.user) 
		res.redirect('/failure'); 
    // console.log(":::::::::::::::::::",req.user);
    res.redirect('http://localhost:3000/oauthotpverify');

}

const failureGoogleLogin = (req , res) => { 
	res.send("Error"); 
}

module.exports = {
    successGoogleLogin,
    failureGoogleLogin
}