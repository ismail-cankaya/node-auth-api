const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

const verifyToken = require('../middleware/authMiddleware');

router.get('/me', verifyToken, (req, res) => {
    res.json({
        success: true,
        message: "Gizli bölgeye hoş geldin!",
        user: req.user 
    });
});

module.exports = router;