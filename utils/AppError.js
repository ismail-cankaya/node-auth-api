class AppError extends Error {
    constructor(message, statusCode, errorCode) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.isOperational = true; // Bu, beklenen ve yönetilebilir bir hata olduğunu belirtir
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = AppError;