// utils/errorCodes.js

module.exports = {
    // KİMLİK DOĞRULAMA (AUTHENTICATION)
    AUTH: {
        INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS', // E-posta veya şifre yanlış
        TOKEN_MISSING: 'AUTH_TOKEN_MISSING',             // Token gönderilmedi
        TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',             // Token'ın süresi dolmuş
        TOKEN_INVALID: 'AUTH_TOKEN_INVALID',             // Token manipüle edilmiş/bozuk
        UNAUTHORIZED_ACTION: 'AUTH_UNAUTHORIZED_ACTION'  // Oturum açılmadan işlem yapılmaya çalışılıyor
    },

    // KULLANICI İŞLEMLERİ (USER)
    USER: {
        ALREADY_EXISTS: 'USER_ALREADY_EXISTS',           // E-posta/TC zaten kayıtlı
        NOT_FOUND: 'USER_NOT_FOUND',                     // Kullanıcı bulunamadı (Login hariç kullanılır)
        ACCOUNT_LOCKED: 'USER_ACCOUNT_LOCKED',           // Çok fazla hatalı deneme (Brute-force koruması)
        EMAIL_NOT_VERIFIED: 'USER_EMAIL_NOT_VERIFIED'    // E-posta onaylanmamış
    },

    // YETKİLENDİRME (AUTHORIZATION)
    ACCESS: {
        FORBIDDEN: 'ACCESS_FORBIDDEN',                   // Geçerli token var ama bu sayfaya yetkisi yok
        ROLE_NOT_SUFFICIENT: 'ACCESS_ROLE_NOT_SUFFICIENT'// Admin yetkisi gerekiyor
    },

    // VERİ DOĞRULAMA VE İSTEK (VALIDATION & REQUEST)
    REQUEST: {
        VALIDATION_ERROR: 'REQ_VALIDATION_ERROR',        // Joi/Zod kurallarından geçemedi (Kısa şifre vb.)
        MALFORMED_JSON: 'REQ_MALFORMED_JSON',            // Gelen JSON formatı bozuk
        MISSING_PARAMETERS: 'REQ_MISSING_PARAMETERS'     // Zorunlu alanlar eksik
    },

    // SİSTEM VE SUNUCU (SYSTEM - ASLA DETAY VERİLMEZ)
    SYSTEM: {
        INTERNAL_ERROR: 'SYS_INTERNAL_ERROR',            // Yakalanamayan çökme / Veritabanı hatası
        DATABASE_TIMEOUT: 'SYS_DATABASE_TIMEOUT',        // MySQL cevap vermiyor
        SERVICE_UNAVAILABLE: 'SYS_SERVICE_UNAVAILABLE'   // Bakım modu veya aşırı yük
    }
};