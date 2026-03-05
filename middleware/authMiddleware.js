const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const ERROR_CODES = require('../utils/errorCodes');

const verifyToken = (req, res, next) => {
    // 1. Gelen isteğin başlıklarından 'authorization' etiketli olanı çek.
    const authHeader = req.headers['authorization'];
    // 2. Eğer başlık varsa ("&&" kontrolü), metni boşluktan böl.
    // ["Bearer", "eyJhbGci..."] dizisinin 1. indeksini alıp 'token' değişkenine aktar.
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return next(new AppError(ERROR_CODES.AUTH_TOKEN_MISSING, 401)); // Token yoksa hata oluştur ve errorMiddleware'e gönder
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return next(new AppError(ERROR_CODES.AUTH_TOKEN_INVALID, 401)); // Geçersiz token ise hata oluştur ve errorMiddleware'e gönder
    }
};

module.exports = verifyToken;