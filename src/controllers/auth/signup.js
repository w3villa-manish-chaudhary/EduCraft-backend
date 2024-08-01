const { executeRawQuery } = require('../../database/dbconfig');
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');
const argon2 = require('argon2'); 
const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;  


exports.createUser = async (req, res) => {
    try {
        const { name, email, phone, password, isActive, comment } = req.body;

        const uniqueId = uuidv4();
        // >>>>>>>>>>>>>>>>>>Hash password  by  using argon2
        const hashedPassword = await argon2.hash(password);

        const query = `
            INSERT INTO Users (uniqueId, name, email, mobileNumber, password, isActive, comment, createdAt, updatedAt)
            VALUES (:uniqueId, :name, :email, :mobileNumber, :password, :isActive, :comment, NOW(), NOW())
        `;

        await executeRawQuery(query, {
            uniqueId,
            name,
            email,
            mobileNumber: phone,
            password: hashedPassword,
            isActive: isActive !== undefined ? isActive : null,
            comment: comment || null
        }, QueryTypes.INSERT);

        // Generate JWT token
        const token = jwt.sign({ uniqueId }, JWT_SECRET_KEY , { expiresIn: '1h' });

        res.status(201).json({ message: 'User created successfully', token});
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};
