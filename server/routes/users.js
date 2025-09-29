const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const pool = require('../config/db');

// Get all users for current tenant
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.findByTenant(req.user.tenant_id);
    // Remove password from response
    const safeUsers = users.map(user => ({
      id: user.id,
      email: user.email,
      role: user.role,
      verified: user.verified,
      created_at: user.created_at
    }));
    res.json(safeUsers);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// Get current user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      id: user.id,
      email: user.email,
      role: user.role,
      verified: user.verified,
      created_at: user.created_at
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});

// Update user role (admin only)
router.put('/:id/role', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { role } = req.body;
    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    await pool.query('UPDATE users SET role = ? WHERE id = ? AND tenant_id = ?', 
      [role, req.params.id, req.user.tenant_id]);
    
    res.json({ message: 'User role updated successfully' });
  } catch (error) {
    console.error('Update role error:', error);
    res.status(500).json({ message: 'Failed to update user role' });
  }
});

module.exports = router;
