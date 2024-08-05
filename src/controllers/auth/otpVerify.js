const { executeRawQuery } = require('../../database/dbconfig');
const { QueryTypes } = require('sequelize');

const otpVerify = async (req, res) => {
    console.log("OTP Verification started");
    
    try {
        const { phone, otp } = req.body;

        if (!phone || !otp) {
            return res.status(400).json({ message: 'Phone number and OTP are required' });
        }

        console.log(">::::::::::::::::::::::", otp);

        const query = `
            SELECT * FROM otpVerification 
            WHERE otpReceiver = :phone
            ORDER BY otpCreatedAt DESC 
            LIMIT 1
        `;
        
        const [otpRecord] = await executeRawQuery(query, { phone }, QueryTypes.SELECT);

        if (!otpRecord) {
            return res.status(404).json({ message: 'No OTP record found for this phone number' });
        }

        console.log(">::::::::::::::::::::::", otpRecord.verificationOtp);

        const currentTime = Math.floor(Date.now() / 1000); // Current time in epoch
        console.log(">>>>>>>>>>>>>>>>>>>>>>>",currentTime );
        

        if (currentTime > otpRecord.otpExpiredAt) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        if (otpRecord.verificationOtp == otp) {
            console.log("::::::::::::correct otp");

            // Update User table
            const updateUserQuery = `
                UPDATE Users 
                SET isMobileVerify = true 
                WHERE mobileNumber = :phone
            `;

            await executeRawQuery(updateUserQuery, { phone }, QueryTypes.UPDATE);

            return res.status(200).json({ message: 'OTP verified successfully and user updated' });
        } else {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: 'Error verifying OTP', error: error.message });
    }
};

module.exports = otpVerify;