const pool = require('../config/db');

// Tenant model with database operations
class Tenant {
  // Create new tenant
  static async create({ name, subdomain, settings }) {
    const [result] = await pool.query(
      'INSERT INTO tenants (name, subdomain, settings, created_at) VALUES (?, ?, ?, NOW())',
      [name, subdomain, JSON.stringify(settings || {})]
    );
    return result.insertId;
  }

  // Find tenant by subdomain
  static async findBySubdomain(subdomain) {
    const [rows] = await pool.query('SELECT * FROM tenants WHERE subdomain = ?', [subdomain]);
    return rows[0];
  }

  // Find tenant by ID
  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM tenants WHERE id = ?', [id]);
    return rows[0];
  }

  // Get all tenants
  static async findAll() {
    const [rows] = await pool.query('SELECT * FROM tenants');
    return rows;
  }

  // Update tenant settings
  static async updateSettings(id, settings) {
    await pool.query('UPDATE tenants SET settings = ? WHERE id = ?', [JSON.stringify(settings), id]);
  }
}

module.exports = Tenant;
