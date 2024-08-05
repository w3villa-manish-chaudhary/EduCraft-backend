const twilio = require('twilio');

const accountSid = process.env.MOBILE_SID;
const authToken = process.env.MOBILE_AUTH_TOKEN;
const twilioPhoneNumber = '+18576889259';

const client = new twilio(accountSid, authToken);

exports.sendOTP = async (phone, otp) => {
    if (!phone || !otp) {
        throw new Error('Phone number and OTP are required.');
    }

    try {
        const formattedNumber = `+91${phone}`;
        const message = await client.messages.create({
            body: `Your OTP code is ${otp}`,
            from: twilioPhoneNumber,
            to: formattedNumber
        });
        console.log('OTP sent successfully:', message.sid);
        
        return message.sid;
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw new Error('Failed to send OTP.');
    }
};