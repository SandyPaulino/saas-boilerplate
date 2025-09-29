const express = require('express');
const router = express.Router();
const Tenant = require('../models/Tenant');
const authMiddleware = require('../middleware/authMiddleware');

// Get all tenants (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    const tenants = await Tenant.findAll();
    res.json(tenants);
  } catch (error) {
    console.error('Get tenants error:', error);
    res.status(500).json({ message: 'Failed to fetch tenants' });
  }
});

// Get tenant by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.json(tenant);
  } catch (error) {
    console.error('Get tenant error:', error);
    res.status(500).json({ message: 'Failed to fetch tenant' });
  }
});

// Create new tenant
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { name, subdomain, settings } = req.body;
    const tenantId = await Tenant.create({ name, subdomain, settings });
    res.json({ id: tenantId, message: 'Tenant created successfully' });
  } catch (error) {
    console.error('Create tenant error:', error);
    res.status(500).json({ message: 'Failed to create tenant' });
  }
});

// Update tenant settings
router.put('/:id/settings', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { settings } = req.body;
    await Tenant.updateSettings(req.params.id, settings);
    res.json({ message: 'Tenant settings updated successfully' });
  } catch (error) {
    console.error('Update tenant error:', error);
    res.status(500).json({ message: 'Failed to update tenant' });
  }
});

module.exports = router;
