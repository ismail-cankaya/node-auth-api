const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basit bir test rotası
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js Auth API');
});

// Veritabanı Bağlantı Testi
const testDbConnection = async () => {
    try {
        const [rows] = await db.execute('SELECT 1 + 1 AS result');
        console.log(`✅ MySQL Bağlantısı Başarılı! Test Sonucu: ${rows[0].result}`);
    } catch (error) {
        console.error('❌ Veritabanı Bağlantı Hatası:', error.message);
    }
};

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Sunucu çalışıyor: http://localhost:${PORT}`);
    testDbConnection();
});