const jtw = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({
            success: false, 
            message: 'Erişim reddedildi. Lütfen giriş yapınız.'
        });
    }

    try {
        const verified = jtw.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Geçersiz token. Lütfen tekrar giriş yapınız.'
        });
    }
};

module.exports = verifyToken;