const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basit bir test rotası
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js Auth API');
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
        await new Promise(resolve => setTimeout(resolve, 5000));
        return initializeDatabase(); 
    }
};

const PORT = process.env.PORT || 3000;

// ÖNCE veritabanını bekle, SONRA sunucuyu başlat
initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Sunucu çalışıyor: http://localhost:${PORT}`);
    });
});