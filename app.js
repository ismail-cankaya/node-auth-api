const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Nginx IP'si yerine gerçek kullanıcı IP'sini (X-Real-IP) almamızı sağlar.
app.set('trust proxy', 1);

// Middleware
app.use(cors()); //Cors: Her kaynaktan gelen isteklere izin ver (Angular, React vb. frontend uygulamaları için)
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // URL-encoded verileri işleme


// Routes
app.use('/api/auth', authRoutes); // Auth routes
app.use('/api/users', userRoutes); // User routes

app.get('/', (req, res) => {
  res.send('Welcome to the Node.js Auth API');
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Sayfa bulunamadı.'
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyiniz.'
    });
});

// Veritabanı Hazır Olana Kadar Deneyen Fonksiyon
const initializeDatabase = async () => {
    try {
        // Pool üzerinden basit bir sorgu ile testi yap
        const [rows] = await db.execute('SELECT 1 + 1 AS result');
        console.log(`✅ MySQL Bağlantısı Başarılı! Test Sonucu: ${rows[0].result}`);
        
    } catch (error) {
        console.error('❌ Veritabanı henüz hazır değil, 5 saniye sonra tekrar denenecek...');
        // 5 saniye bekle ve özyinelemeli (recursive) olarak tekrar dene
        await new Promise(resolve => setTimeout(resolve, 1000));
        return initializeDatabase(); 
    }
};

const PORT = process.env.PORT || 3000;

// ÖNCE veritabanını bekle, SONRA sunucuyu başlat
initializeDatabase().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 API İçeride ${PORT} portunda çalışıyor.`);
        console.log(`🌐 Dışarıdan Nginx Gateway üzerinden erişiliyor.`);
    });
});