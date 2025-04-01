const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// Logout Route
router.post('/logout', (req, res) => {
    // Clear the token cookie or remove from localStorage on the client side
    res.clearCookie('token');  // Or you can use Cookies.remove('token') if using js-cookie
    res.status(200).json({ message: 'Logged out successfully' });
  });

module.exports = router;
