const { getKivoConfig } = require("../../utils/index");
const jwt = require('jsonwebtoken');
const axios = require('axios'); // Ensure axios is imported
const  { AuthorizationCode }  = require("simple-oauth2");

const kivoConfig = getKivoConfig();

// Kivo Sign-In function
const kivoSignIn = async (req, res, next) => {
    try {
        console.log("::::::::::::::::::Kivo Sign-In Initiated::::::::::::::::::");

        // Create OAuth2 client with the necessary configuration
        const client = new AuthorizationCode({
            client: {
                id: kivoConfig.KIVO_CLIENT_ID,
                secret: kivoConfig.KIVO_CLIENT_SECRET,
            },
            auth: {
                tokenHost: kivoConfig.KIVO_PROVIDER_URL,
                authorizePath: kivoConfig.KIVO_AUTHORIZE_PATH,
            },
        });

        // Generate authorization URL for Kivo OAuth
        const authorizationUri = client.authorizeURL({
            redirect_uri: kivoConfig.KIVO_CALLBACK_URL,
            scope: kivoConfig.KIVO_SCOPE,
        });

        console.log('Generated Authorization URI:', authorizationUri);
        res.redirect(authorizationUri); // Redirect to Kivo's authorization page

    } catch (error) {
        console.error("Error during Kivo Sign-In:", error);
        next(error);
    }
};

// Kivo Callback function
const kivoCallback = async (req, res, next) => {
    try {
      console.log(":::::::::::::::::Kivo Callback Start:::::::::::::::::::");
  
      const code = req.query.code;
      if (!code) {
        throw new Error("No authorization code received");
      }
  
      console.log("Authorization Code received:", code);
  
      const client = new AuthorizationCode({
        client: {
          id: kivoConfig.KIVO_CLIENT_ID,
          secret: kivoConfig.KIVO_CLIENT_SECRET,
        },
        auth: {
          tokenHost: kivoConfig.KIVO_PROVIDER_URL,
        },
      });
  
      const tokenParams = {
        code,
        redirect_uri: kivoConfig.KIVO_CALLBACK_URL,
      };
  
      console.log("Token Params: ", tokenParams);
  
      // Attempt to exchange the authorization code for an access token
      const accessToken = await client.getToken(tokenParams);
      
      console.log("Access Token: ", accessToken);
  
      const userResponse = await axios.get(
        `${kivoConfig.KIVO_PROVIDER_URL}/api/v1/users/me.json`,
        {
          headers: {
            Authorization: `Bearer ${accessToken.token.access_token}`,
          },
        }
      );
  
      const rawInfo = userResponse.data;
      const kivo_user = {
        firstName: rawInfo.current_profile.first_name,
        email: rawInfo.current_profile.email,
        timeZone: rawInfo.current_profile.time_zone,
        kivo_id: rawInfo.current_profile.id,
        refresh_token: accessToken.token.refresh_token,
        access_token: accessToken.token.access_token,
      };
  
      // Generate a JWT for your system
      const payload = { email: kivo_user.email };
      const secretKey = kivoConfig.KIVO_SECRET_KEY;
      const token_for_kivo = jwt.sign(payload, secretKey, { expiresIn: '12h' });
  
      console.log('Generated Token:', token_for_kivo);
  
      return res.status(200).json({
        data: {
          email: kivo_user.email,
          refresh_token: accessToken.token.refresh_token,
          access_token: accessToken.token.access_token,
          token_for_kivo: token_for_kivo
        },
        message: "Signed in successfully",
      });
  
    } catch (error) {
      console.error("Error in Kivo Callback function", error.response?.data || error);
      next(error);
    }
  };
  

// Export the functions
module.exports = {
    kivoSignIn,
    kivoCallback
};
