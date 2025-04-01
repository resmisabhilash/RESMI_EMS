const express = require('express');
const { getAllUsers, getAllEvents } = require('../controllers/adminController');
const { auth, adminOnly } = require('../middlewares/auth');
const router = express.Router();
// const { protect, admin } = require('../middlewares/authMiddleware');
const User = require('../models/User');
const Event = require('../models/Event');


// Define the route handler for '/users'
router.get('/users', getAllUsers,auth,adminOnly);


router.get('/users', getAllUsers);
// router.get('/events', getAllEvents);
// DELETE a user by ID
router.delete("/users/:userId", auth, adminOnly, async (req, res) => {
    try {
        const userId = req.params.userId;
        const deletedUser = await User.findByIdAndDelete(userId);
        
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Error deleting user", error });
    }
});

module.exports = router;


