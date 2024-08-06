const { executeRawQuery } = require('../database/dbconfig');
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { QueryTypes } = require('sequelize');

exports.sendEmail = async (toemail) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    // Generate a verification token
    const token = crypto.randomBytes(32).toString('hex');

    console.log(">>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<", token);

    const now = Date.now();
    const emailCreatedAt = now;
    const emailExpiredAt = now + 10 * 60 * 1000;
    const timestamp = new Date();

    const emailQuery = `
      INSERT INTO emailVerification (uniqueId, emailReceiver, verificationHash, createdAt, updatedAt, emailCreatedAt, emailExpiredAt)
      VALUES (:uniqueId, :emailReceiver, :verificationHash, :timestamp, :timestamp, :emailCreatedAt, :emailExpiredAt)
    `;

    await executeRawQuery(emailQuery, {
      uniqueId: uuidv4(),
      emailReceiver: toemail,
      verificationHash: token,
      timestamp,
      emailCreatedAt,
      emailExpiredAt
    }, QueryTypes.INSERT);

    const verificationLink = `http://localhost:3000/verify/${token}`;

    let mailOptions = {
      from: '"EduCraft" <EduCraft@gmail.com>',
      to: toemail,
      subject: 'Verify Your Account',
      html: `Please click this link to verify your email: <a href="${verificationLink}">${verificationLink}</a>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};