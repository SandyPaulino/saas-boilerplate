// Test server without database dependency
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5002', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());

// Mock authentication routes for testing
app.post('/api/auth/register', (req, res) => {
  const { email, password, tenant_id } = req.body;
  
  // Generate a mock verification token
  const token = require('crypto').randomBytes(32).toString('hex');
  const verificationUrl = `http://localhost:5002/verify-email?token=${token}`;
  
  console.log(`📧 Mock: Sending verification email to ${email}`);
  console.log(`🔗 Verification URL: ${verificationUrl}`);
  
  res.json({ 
    message: 'Registration successful. Please verify your email.',
    verificationUrl: verificationUrl // Include URL in response for testing
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Mock successful login for test@example.com
  if (email === 'test@example.com' && password === 'password123') {
    const token = require('jsonwebtoken').sign(
      { email, tenant_id: 1 },
      'your_super_secret_jwt_key_here_make_it_long_and_random_12345',
      { expiresIn: '1d' }
    );
    
    res.json({
      token,
      user: { id: 1, email, role: 'user', tenant_id: 1 }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/api/auth/verify/:token', (req, res) => {
  const { token } = req.params;
  console.log(`📧 Mock: Verifying token ${token}`);
  res.json({ message: 'Email verified successfully' });
});

app.get('/api/auth/verify', (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const decoded = require('jsonwebtoken').verify(
      token, 
      'your_super_secret_jwt_key_here_make_it_long_and_random_12345'
    );
    res.json({ user: { id: 1, email: decoded.email, role: 'user', tenant_id: decoded.tenant_id } });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Mock users endpoint
app.get('/api/users', (req, res) => {
  res.json([
    { id: 1, email: 'test@example.com', role: 'user', verified: true, created_at: new Date() },
    { id: 2, email: 'admin@example.com', role: 'admin', verified: true, created_at: new Date() }
  ]);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Test server running on port ${PORT}`);
  console.log(`📧 Mock email verification enabled`);
  console.log(`🧪 Test user: test@example.com / password123`);
  console.log(`🌐 Frontend should connect to: http://localhost:5002`);
});

