const Joi = require('joi');

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).pattern(/^[a-zA-Z0-9._-]+$/).required().messages({
        'string.min': 'Kullanıcı adı en az 3 karakter olmalıdır.',
        'string.max': 'Kullanıcı adı en fazla 30 karakter olabilir.',
        'any.required': 'Kullanıcı adı gereklidir.'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Lütfen geçerli bir e-posta adresi giriniz.',
        'any.required': 'E-posta gereklidir.'
    }),
    password: Joi.string().pattern(passwordPattern).required().messages({
        'string.pattern.base': 'Parola en az 8 karakter olmalı, en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir.',
        'any.required': 'Parola gereklidir.'
    }),

    first_name: Joi.string().max(50).optional().allow(null, '').messages({
        'string.max': 'İsim en fazla 50 karakter olabilir.'
    }),
    last_name: Joi.string().max(50).optional().allow(null, '').messages({
        'string.max': 'Soyisim en fazla 50 karakter olabilir.'
    }),
    tc_no: Joi.string().length(11).optional().allow(null, '').messages({
        'string.length': 'TC No 11 karakter olmalıdır.'
    }),
    phone: Joi.string().max(15).optional().allow(null, '').messages({
        'string.max': 'Telefon numarası en fazla 15 karakter olabilir.'
    }),
    birth_date: Joi.date().optional().allow(null, '').messages({
        'date.base': 'Geçerli bir doğum tarihi giriniz.'
    }),
    gender: Joi.string().valid('male', 'female', 'other').optional().allow(null, '').messages({
        'any.only': 'Cinsiyet "Erkek", "Kadın" veya "Diğer" olabilir.'
    })
});

const loginSchema = Joi.object({
// identifier: Email, TC No veya Telefon olabilir
    identifier: Joi.string().required().messages({
        'any.required': 'E-posta, TC No veya Telefon numarası gereklidir.'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Şifre alanı boş bırakılamaz.'
    })
});

module.exports = {
    registerSchema,
    loginSchema
};