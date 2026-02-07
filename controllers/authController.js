const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../schemas/authSchema');

// Register a new user
exports.register = async (req, res) => {
    try {
        // Validate request body
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ 
                success: false,
                message: error.details[0].message 
            });
        }

        const { username, email, password, first_name, last_name, tc_no, phone, birth_date, gender } = req.body;

        // Check if user already exists
        const existingUser = await User.findByIdentifier(email); 
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Bu kullanıcı bilgileriyle zaten bir kayıt mevcut.' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({
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

        res.status(201).json({
            success: true,
            message: 'Kullanıcı başarıyla kaydedildi.',
            user: newUser
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyiniz.'
        });
    }
}

// Login user

exports.login = async (req, res) => {
    try {
        // Validate request body
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
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

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyiniz.'
        });
    }
}