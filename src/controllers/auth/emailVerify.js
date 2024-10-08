const { executeRawQuery } = require('../../database/dbconfig');
const { QueryTypes } = require('sequelize');
const {updateEmailUserQuery , emailVerificationCheck} = require('../../config/nativeQuery/nativeQuery.json')

const emailVerify = async (req, res) => {
  console.log(">>>>>>>>>>>>>hello in emailVerify<<<<<<<<<<<<<>>>>>>>>");
  
  try {

    const {token} = req.body;





    const [verificationRecord] = await executeRawQuery(emailVerificationCheck, {
      token,
      currentTime: Date.now()
    }, QueryTypes.SELECT);

    if (!verificationRecord) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification link" });
    }

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>from DB", verificationRecord.verificationHash);
    console.log("Email to verify:", verificationRecord.emailReceiver);



    const updateResult = await executeRawQuery(updateEmailUserQuery, 
      { email: verificationRecord.emailReceiver }, 
      QueryTypes.UPDATE
    );


    if (updateResult[0] === 0) {
      return res.status(404).json({ success: false, message: "User not found or already verified" });
    }

    return res.status(200).json({ success: true, message: "Email verified successfully" });

  } catch (error) {
    console.error("Error in email verification:", error);
    res.status(500).json({ success: false, message: "An error occurred during email verification" });
  }
};

module.exports = emailVerify;