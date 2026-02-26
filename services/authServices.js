const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../schemas/authSchema');

const AppError = require('../utils/AppError');
const ERROR_CODES = require('../utils/errorCodes');


// Register a new user
exports.register = async (userData) => {

    // Validate request body
    const { error, value } = registerSchema.validate(userData);
    if (error) {
        throw new AppError(ERROR_CODES.REQUEST.VALIDATION_ERROR, 400);
    }

    // Extract validated values
    const { username, email, password, first_name, last_name, tc_no, phone, birth_date, gender } = value;

    // Check if user already exists
    const exitingUser = await userModel.findByIdentifier(email) ||
        await userModel.findByIdentifier(tc_no) ||
        await userModel.findByIdentifier(phone);

    if (exitingUser) {
        throw new AppError(ERROR_CODES.USER.ALREADY_EXISTS, 409);
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

exports.login = async (loginData) => {
    // Validate request body
    const { error, value } = loginSchema.validate(loginData);
    if (error) {
        throw new AppError(ERROR_CODES.REQUEST.VALIDATION_ERROR, 400);
    }
    const { identifier, password } = value;

    // Find user by identifier (email, tc_no, or phone)
    const user = await userModel.findByIdentifier(identifier);
    if (!user) {
        throw new AppError(ERROR_CODES.USER.NOT_FOUND, 404);
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError(ERROR_CODES.AUTH.INVALID_CREDENTIALS, 401);
    }

    // Generate JWT
    const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );
    
    return token;
}
