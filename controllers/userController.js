const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAll();
        res.json({
            success: true,
            message: 'Kullanıcılar başarıyla getirildi.',
            users
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyiniz.'
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deleted = await User.deleteById(userId);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Kullanıcı bulunamadı.'
            });
        }
        res.json({
            success: true,
            message: 'Kullanıcı başarıyla silindi.'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyiniz.'
        });
    }
};