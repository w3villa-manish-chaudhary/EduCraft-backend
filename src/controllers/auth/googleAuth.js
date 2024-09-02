const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const successGoogleGitHubLogin = (req, res) => {
    if (!req.user) {
        return res.redirect('/failure');
    }
    // Redirect to the frontend URL for OAuth OTP verification
    res.redirect(`${process.env.FRONTEND_URL}/oauthotpverify`);
}

const failureGoogleGitHubLogin = (req, res) => {
    res.send("Error");
}

const oAuthLoginSuccess = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // Create JWT token
    const token = jwt.sign({ uniqueId: req.user.uniqueId, email: req.user.email }, JWT_SECRET_KEY, { expiresIn: '24h' });

    // Send JSON response with token and user details
    res.status(200).json({ 
        message: "Successfully logged in",
        user: req.user,
        token
    });
}

module.exports = {
    successGoogleGitHubLogin,
    failureGoogleGitHubLogin,
    oAuthLoginSuccess
}
