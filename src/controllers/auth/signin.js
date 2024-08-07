const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { executeRawQuery } = require('../../database/dbconfig');
const { QueryTypes } = require('sequelize');
const { loginQuery } = require('../../config/nativeQuery/nativeQuery.json');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;  




exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }


        const [user] = await executeRawQuery(loginQuery, { email }, QueryTypes.SELECT);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

     
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

     
        const token = jwt.sign({ uniqueId: user.uniqueId, email: user.email }, JWT_SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ message: 'Logged in successfully', token, });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};
