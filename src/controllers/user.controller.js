const userService = require('../service/user.service');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt.middleware');

const createUser = async (req, res) => {
  try {
    const data = req.body;
    data.password = await bcrypt.hash(data.password, 10);
    const user = await userService.createUser(data);
    res.status(201).json({
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      message: 'Get all users successfully',
      users,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const user = await userService.updateUser(id, data);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.deleteUser(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userService.getUserByEmail(email);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'user not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'password not match' });
    }
    const token = await generateToken(user);
    res.status(200).json({
      message: 'Login successfully',
      token
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
  loginUser,
}