const pool = require('../config/db');

const tenantMiddleware = async (req, res, next) => {
  try {
    // Extract tenant from subdomain or query parameter
    const host = req.headers.host;
    const subdomain = host.split('.')[0];
    
    const [tenants] = await pool.query('SELECT * FROM tenants WHERE subdomain = ?', [subdomain]);
    
    if (!tenants[0]) {
      return res.status(404).json({ message: 'Tenant not found' });
    }

    req.tenant = tenants[0];
    next();
  } catch (error) {
    res.status(500).json({ message: 'Tenant identification failed' });
  }
};

module.exports = tenantMiddleware;
