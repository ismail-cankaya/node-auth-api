const authorize = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Assuming the user's role is stored in req.user

    if (!userRole) {
      return res.status(401).json({
        success: false,
        message: 'Erişim reddedildi. Kullanıcı Bulunamadı.'
      });
    }

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: 'Erişim reddedildi. Yetersiz yetki.'
      });
    }

    next();
  };
};

module.exports = authorize;