const db = require('../config/db');

class User {
    // Create a new user
    static async create(userData) {
        const { 
            username, 
            email, 
            password, 
            first_name = null, 
            last_name = null, 
            tc_no = null, 
            phone = null,
            birth_date = null, 
            gender = null 
        } = userData;
    
        const query = `INSERT INTO users 
            (username, email, password, first_name, last_name, tc_no, phone, birth_date, gender) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            
        const [result] = await db.execute(query, [
            username, email, password, first_name, last_name, tc_no, phone, birth_date, gender
        ]);
        return result;
    }

// 1. Çoklu Giriş Desteği: Email, TC No veya Telefon ile Kullanıcı Bulma
    static async findByIdentifier(identifier) {
        // SQL sorgusunda OR kullanarak üç sütunu da kontrol ediyoruz
        const query = `
            SELECT * FROM users 
            WHERE email = ? OR tc_no = ? OR phone = ?
        `;
        
        // Sorgudaki üç soru işaretine de aynı 'identifier' değerini gönderiyoruz
        const [rows] = await db.execute(query, [identifier, identifier, identifier]);
        
        // Eşleşen kullanıcı varsa ilk kaydı döner
        return rows[0];
    }

    // 2. ID ile Bulma (Kullanıcı giriş yaptıktan sonra profil bilgileri için gereklidir)
    static async findById(userId) {
        const query = 'SELECT id, username, email, first_name, last_name, role, created_at FROM users WHERE id = ?';
        const [rows] = await db.execute(query, [userId]);
        return rows[0];
    }

    static async getAll() {
        const query = 'SELECT id, username, email, first_name, last_name, role, created_at FROM users';
        const [rows] = await db.execute(query);
        return rows;
    }

    static async deleteById(userId) {
        const query = 'DELETE FROM users WHERE id = ?';
        const [result] = await db.execute(query, [userId]);
        return result.affectedRows > 0; // Silme işlemi başarılıysa true döner
    }
}


module.exports = User;