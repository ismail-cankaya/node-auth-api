const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');

router.use(verifyToken); // Tüm kullanıcı rotalarını korumaya al

// Get all users (admin yetkisi gerektirir)
router.get('/', authorize('admin'), userController.getAllUsers);

// Delete a user by ID (admin yetkisi gerektirir)
router.delete('/:id', authorize('admin'), userController.deleteUser);

module.exports = router;