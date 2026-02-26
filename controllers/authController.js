const authService = require('../services/authServices');
const catchAsync = require('../utils/catchAsync');

// Register a new user
exports.register = catchAsync(async (req, res, next) => {
    const newUser = await authService.register(req.body);

    res.status(201).json({
        success: true,
        message: 'Kullanıcı başarıyla oluşturuldu.',
        user: newUser
    });
});

// Login İşlemi
exports.login = catchAsync(async (req, res, next) => {
    
    // 1. İsteği mutfağa gönderip, dönen bileti (Token) teslim alıyoruz.
    const token = await authService.login(req.body);

    // 2. Başarılı cevabı müşteriye sunuyoruz.
    res.status(200).json({
        success: true,
        token
    });
});