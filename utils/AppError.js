class AppError extends Error {
    constructor(message, statuscode, errorCode) {
        super(message);
        this.statuscode = statuscode;
        this.errorCode = errorCode;
        this.isOperational = true; // Bu, beklenen ve yönetilebilir bir hata olduğunu belirtir
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = AppError;