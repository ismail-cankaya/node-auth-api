const Joi = require('joi');

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required().messages({
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
    })
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Lütfen geçerli bir e-posta adresi giriniz.'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Şifre alanı boş bırakılamaz.'
    })
});

module.exports = {
    registerSchema,
    loginSchema
};