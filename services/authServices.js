const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../schemas/authSchema');

// Register a new user
exports.register = async (req, res) => {

    // Validate request body
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    // Extract validated values
    const { username, email, password, first_name, last_name, tc_no, phone, birth_date, gender } = value;

    // Check if user already exists
    const exitingUser = await userModel.findByIdentifier(email) ||
        await userModel.findByIdentifier(tc_no) ||
        await userModel.findByIdentifier(phone);

    if (exitingUser) {
        return res.status(409).json({ success: false, message: 'Bu kullanıcı bilgileriyle zaten bir kayıt mevcut.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword,
        first_name,
        last_name,
        tc_no,
        phone,
        birth_date,
        gender
    });

    return newUser;
}

// Login user

exports.login = async (req, res) => {
    // Validate request body
    const { error } = loginSchema.validate(req.body);
    if (error) {
        
    }
    const { identifier, password } = req.body;

    // Find user by identifier (email, tc_no, or phone)
    const user = await User.findByIdentifier(identifier);
    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Geçersiz kimlik bilgileri.'
        });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: 'Geçersiz kimlik bilgileri.'
        });
    }

    // Generate JWT
    const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    res.json({
        success: true,
        token
    });

    return token;

}