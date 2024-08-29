const jwt = require('jsonwebtoken');
const secretKey = 'zxcvbnmasdfghjklqwertyuiop';

const tokenDecorator = (req, res, next) => {
  const token = req.header('authorization');
  console.log("::::::::::token:::::::", token);

  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    // console.log(req.user);

    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = tokenDecorator;
