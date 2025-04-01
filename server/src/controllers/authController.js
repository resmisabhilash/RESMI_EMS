const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");


// Register function
const register = async (req, res) => {
  const { name,email, password, role } = req.body;

  try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Create a new user
      const newUser = new User({
          name,
          email,
          password,
          role
      });

      // Save the user to the database
      await newUser.save();
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      // Send a success response
      res.status(201).json({ message: 'User registered successfully',token });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
};

// Login function
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
          { id: user._id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );
    //   res.status(201).json({ message: 'Login successfully', token, role: user.role });
    return res.json({
        message: "Login successful",
        token,
        role: user.role, // Ensure role is included
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
    
  
      // Send response with token
      // res.json({ token });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login };