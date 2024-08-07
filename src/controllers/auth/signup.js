const {executeRawQuery} = require('../../database/dbconfig');
const Users = require('../../database/models/user.model');
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { sendOTP } = require('../../services/otpService');
const { sendEmail } = require('../../services/emailService');
const {insertUserQuery , otpQuery} = require('../../config/nativeQuery/nativeQuery.json')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, phone, password, isActive, comment } = req.body;


        const emailResult = await Users.findOne({
            attributes: ['email', 'isEmailVerify'],
            where: { email },
        });

        console.log("::::::::::::::>>>>?????????,", emailResult );
        

        if (emailResult && emailResult.isEmailVerify === true) {
            return res.status(400).json({ message: 'Email already registered and verified' });
        }

        const phoneResult = await Users.findOne({
            attributes: ['mobileNumber', 'isMobileVerify'],
            where: { mobileNumber: phone },
        });

        if (phoneResult && phoneResult.isMobileVerify === true) {
            return res.status(400).json({ message: 'Phone number already registered and verified' });
        }

        const uniqueId = uuidv4();
        const hashedPassword = await argon2.hash(password);
        const otp = generateOTP();
        const timestamp = new Date();

       

        await executeRawQuery(insertUserQuery, {
            uniqueId,
            name,
            email,
            mobileNumber: phone,
            password: hashedPassword,
            isActive: isActive !== undefined ? isActive : null,
            comment: comment || null,
            timestamp
        }, QueryTypes.INSERT);

        const token = jwt.sign({ uniqueId }, JWT_SECRET_KEY, { expiresIn: '1h' });

        //Send OTP
        await sendOTP(phone, otp);


        // Send  email
        sendEmail(email)


        const now = Date.now();
        const otpCreatedAt = now;
        const otpExpiredAt = now + 10 * 60 * 1000;


        await executeRawQuery(otpQuery, {
            uniqueId: uuidv4(),
            otpReceiver: phone,
            verificationOtp: otp,
            timestamp,
            otpCreatedAt,
            otpExpiredAt
        }, QueryTypes.INSERT);

        res.status(201).json({
            message: 'User created successfully. OTP sent and saved.',
            token,
            otpCreatedAt,
            otpExpiredAt
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};