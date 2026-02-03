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

    // Find a user by ID
    static async findById(userId) {
        const query = 'SELECT id, username, email, role, created_at FROM users WHERE id = ?';
        const [rows] = await db.execute(query, [userId]);
        return rows[0];
    }

    // Find a user by email
    static async findByEmail(email) {
        const query = 'SELECT id, username, email, password, role, created_at FROM users WHERE email = ?';
        const [rows] = await db.execute(query, [email]);
        return rows[0];
    }
}

module.exports = User;