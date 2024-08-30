const { sendOTP } = require('../../services/otpService');
const { otpQuery , updateMobileNumberQuery } = require('../../config/nativeQuery/nativeQuery.json');
const { QueryTypes } = require('sequelize');
const { executeRawQuery, sequelize } = require('../../database/dbconfig');
const { v4: uuidv4 } = require('uuid');
const Users  = require('../../database/models/user.model');


const oauthotpsend = async (req, res, next) => {
  try {
    const { phone } = req.body;

    const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();
    const otp = generateOTP();

    
    await sendOTP(phone, otp);

    const now = Date.now();
    const otpCreatedAt = now;
    const otpExpiredAt = now + 10 * 60 * 1000;
    const timestamp = new Date();

    await executeRawQuery(otpQuery, {
      uniqueId: uuidv4(),
      otpReceiver: phone,
      verificationOtp: otp,
      timestamp,
      otpCreatedAt,
      otpExpiredAt
    }, QueryTypes.INSERT);

    


    await sequelize.query(updateMobileNumberQuery, {
      replacements: { mobileNumber: phone },
      type: QueryTypes.UPDATE
    });



    const user = await Users.findOne({
      where: { mobileNumber: phone  }
    });

    console.log(">>>>>>>><<<<<<<<<<", user);
    

    return res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = oauthotpsend;