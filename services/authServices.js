const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../schemas/authSchema');

// Register a new user
exports.register = async (req, res) => {
    try {

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

        res.status(201).json({
            success: true,
            message: 'Kullanıcı başarıyla kaydedildi.',
            user: newUser
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyiniz.'
        });
    }
}