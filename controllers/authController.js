const authService = require('../services/authServices');
const catchAsync = require('../utils/catchAsync');
const { sendSuccess } = require('../utils/response');

// Register a new user
exports.register = catchAsync(async (req, res, next) => {
    const newUser = await authService.register(req.body);

    return sendSuccess(res, 201, newUser);
});

// Login İşlemi
exports.login = catchAsync(async (req, res, next) => {
    
    // 1. İsteği mutfağa gönderip, dönen bileti (Token) teslim alıyoruz.
    const token = await authService.login(req.body);

    // 2. Başarılı cevabı müşteriye sunuyoruz.
    return sendSuccess(res, 200, { token });
});