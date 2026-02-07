const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');

router.use(verifyToken); // Tüm kullanıcı rotalarını korumaya al

// Get all users (admin yetkisi gerektirir)
router.get('/', userController.getAllUsers);

// Delete a user by ID (admin yetkisi gerektirir)
router.delete('/:id', userController.deleteUser);

module.exports = router;