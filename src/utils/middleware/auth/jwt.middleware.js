const jwt = require('jsonwebtoken');
const User = require('../../../models/user.model');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('authorization');
    if (!authHeader) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

const generateToken = ({ id }) => {
  return jwt.sign({ id }, SECRET, { expiresIn: '1d' });
}

module.exports = { auth, generateToken }