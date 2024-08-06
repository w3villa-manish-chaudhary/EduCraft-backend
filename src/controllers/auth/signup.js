const { executeRawQuery } = require('../../database/dbconfig');
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { sendOTP } = require('../../services/otpService');
const { sendEmail } = require('../../services/emailService');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, phone, password, isActive, comment } = req.body;

        // Check if email already exists
        const emailCheckQuery = `
            SELECT email FROM Users WHERE email = :email
        `;
        const emailExists = await executeRawQuery(emailCheckQuery, { email }, QueryTypes.SELECT);

        if (emailExists.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Check if phone number already exists
        const phoneCheckQuery = `
            SELECT mobileNumber FROM Users WHERE mobileNumber = :phone
        `;
        const phoneExists = await executeRawQuery(phoneCheckQuery, { phone }, QueryTypes.SELECT);

        if (phoneExists.length > 0) {
            return res.status(400).json({ message: 'Phone number already registered' });
        }

        const uniqueId = uuidv4();
        const hashedPassword = await argon2.hash(password);
        const otp = generateOTP();
        const timestamp = new Date();
        
        // Insert new user
        const userQuery = `
            INSERT INTO Users (uniqueId, name, email, mobileNumber, password, isActive, comment, createdAt, updatedAt)
            VALUES (:uniqueId, :name, :email, :mobileNumber, :password, :isActive, :comment, :timestamp, :timestamp)
        `;

        await executeRawQuery(userQuery, {
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
        // await sendOTP(phone, otp);


        // Send  email
        sendEmail(email)


        const now = Date.now(); 
        const otpCreatedAt = now;
        const otpExpiredAt = now + 10 * 60 * 1000; 

        const otpQuery = `
            INSERT INTO otpVerification (uniqueId, otpReceiver, verificationOtp, createdAt, updatedAt, otpCreatedAt, otpExpiredAt)
            VALUES (:uniqueId, :otpReceiver, :verificationOtp, :timestamp, :timestamp, :otpCreatedAt, :otpExpiredAt)
        `;

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