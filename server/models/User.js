const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// User model with database operations
class User {
  // Create new user with hashed password
  static async create({ email, password, tenant_id, role }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (email, password, tenant_id, role, verified, created_at) VALUES (?, ?, ?, ?, false, NOW())',
      [email, hashedPassword, tenant_id, role]
    );
    return result.insertId;
  }

  // Find user by email
  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  // Find user by ID
  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  // Verify password
  static async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Update verification status
  static async verifyUser(email) {
    await pool.query('UPDATE users SET verified = true WHERE email = ?', [email]);
  }

  // Get all users for a tenant
  static async findByTenant(tenant_id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE tenant_id = ?', [tenant_id]);
    return rows;
  }
}

module.exports = User;
