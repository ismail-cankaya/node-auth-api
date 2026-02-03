const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors()); //Cors: Her kaynaktan gelen isteklere izin ver (Angular, React vb. frontend uygulamaları için)
app.use(express.json());
app.use('/api/auth', authRoutes); // Auth routes
app.use(express.urlencoded({ extended: true })); // URL-encoded verileri işleme


// Routes
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

        // 2. Tabloyu Otomatik Oluştur (Eğer yoksa)
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                first_name VARCHAR(50),
                last_name VARCHAR(50),
                tc_no VARCHAR(11) UNIQUE,
                phone VARCHAR(15),
                birth_date DATE,
                gender ENUM('male', 'female', 'other'),
                role VARCHAR(20) DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `;
        
        await db.execute(createTableQuery);
        console.log('✅ Users tablosu hazır!');
        
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