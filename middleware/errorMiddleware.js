const ERROR_CODES = require('../utils/errorCodes');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.errorCode = err.errorCode || ERROR_CODES.SYSTEM.INTERNAL_ERROR;

    if (err.statusCode === 500) {
        console.error('💥 BEKLENMEYEN SİSTEM HATASI:', err);
    }

    res.status(err.statusCode).json({
        success: false,
        errorCode: err.errorCode
    });
};