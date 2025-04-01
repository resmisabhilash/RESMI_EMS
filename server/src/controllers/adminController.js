const User = require('../models/User');
const Event = require('../models/Event');
//get all users

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

module.exports = { getAllUsers };
