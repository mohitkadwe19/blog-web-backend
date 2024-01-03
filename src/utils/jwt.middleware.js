const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

const generateToken = ({ id }) => {
  return jwt.sign({ id }, SECRET, { expiresIn: '1d' });
}

module.exports = { auth, generateToken }