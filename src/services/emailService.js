const nodemailer = require("nodemailer");

const mailVerification = async (req, res) => {

  
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
      }
    });

    let mailOptions = {
      from: '"EduCraft" <EduCraft@gmail.com>',
      to: 'rohit.yadav@w3villa.com',
      subject: 'Verify Your Account',
      text: 'Hello world?',
      html: '<b>Hello world?</b>'
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    res.status(200).json({ message: 'Email sent successfully', messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
};

module.exports = mailVerification;