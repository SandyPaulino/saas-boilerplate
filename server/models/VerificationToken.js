const pool = require('../config/db');
const crypto = require('crypto');

// Verification token model for email verification
class VerificationToken {
  // Create new verification token
  static async create(userId) {
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    await pool.query(
      'INSERT INTO verification_tokens (user_id, token, expires) VALUES (?, ?, ?)',
      [userId, token, expires]
    );
    return token;
  }

  // Find token
  static async find(token) {
    const [rows] = await pool.query(
      'SELECT * FROM verification_tokens WHERE token = ? AND expires > NOW()',
      [token]
    );
    return rows[0];
  }

  // Delete token
  static async delete(token) {
    await pool.query('DELETE FROM verification_tokens WHERE token = ?', [token]);
  }

  // Clean expired tokens
  static async cleanExpired() {
    await pool.query('DELETE FROM verification_tokens WHERE expires < NOW()');
  }
}

module.exports = VerificationToken;
