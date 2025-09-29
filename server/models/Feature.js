const pool = require('../config/db');

// Feature model with database operations
class Feature {
  // Create new feature
  static async create({ tenant_id, name, description }) {
    const [result] = await pool.query(
      'INSERT INTO features (tenant_id, name, description, created_at) VALUES (?, ?, ?, NOW())',
      [tenant_id, name, description]
    );
    return result.insertId;
  }

  // Find features by tenant
  static async findByTenant(tenant_id) {
    const [rows] = await pool.query('SELECT * FROM features WHERE tenant_id = ?', [tenant_id]);
    return rows;
  }

  // Find feature by ID
  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM features WHERE id = ?', [id]);
    return rows[0];
  }

  // Update feature
  static async update(id, { name, description }) {
    await pool.query('UPDATE features SET name = ?, description = ? WHERE id = ?', [name, description, id]);
  }

  // Delete feature
  static async delete(id) {
    await pool.query('DELETE FROM features WHERE id = ?', [id]);
  }
}

module.exports = Feature;
