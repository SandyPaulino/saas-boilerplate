const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const VerificationToken = require('../models/VerificationToken');
const { body, validationResult } = require('express-validator');
const pool = require('../config/db');

// Placeholder for email sending function
const sendVerificationEmail = async (email, token) => {
  // Implement with Nodemailer or email service like SendGrid
  const verificationUrl = `http://localhost:5002/verify-email?token=${token}`;
  console.log(`Sending verification email to ${email} with URL: ${verificationUrl}`);
  // Example with Nodemailer (uncomment and configure):
  /*
  const transporter = require('nodemailer').createTransporter({
    service: process.env.EMAIL_SERVICE,
    auth: { user: process.env.EMAIL_FROM, pass: process.env.EMAIL_API_KEY }
  });
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Verify Your Email',
    html: `<p>Please verify your email by clicking <a href="${verificationUrl}">here</a></p>`
  });
  */
};

// Register endpoint
router.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('tenant_id').isInt()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password, tenant_id } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const userId = await User.create({ email, password, tenant_id, role: 'user' });
    const token = await VerificationToken.create(userId);
    await sendVerificationEmail(email, token);
    
    res.json({ message: 'Registration successful. Please verify your email.' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login endpoint
router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    
    if (!user || !(await User.verifyPassword(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.verified) {
      return res.status(403).json({ message: 'Email not verified' });
    }

    const token = jwt.sign({ email, tenant_id: user.tenant_id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role, tenant_id: user.tenant_id } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Verify email endpoint
router.get('/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const verificationToken = await VerificationToken.find(token);
    
    if (!verificationToken) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    const [users] = await pool.query('SELECT email FROM users WHERE id = ?', [verificationToken.user_id]);
    if (!users[0]) {
      return res.status(400).json({ message: 'User not found' });
    }

    await User.verifyUser(users[0].email);
    await VerificationToken.delete(token);
    
    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ message: 'Verification failed' });
  }
});

// Verify token endpoint (for frontend auth check)
router.get('/verify', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByEmail(decoded.email);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    res.json({ user: { id: user.id, email: user.email, role: user.role, tenant_id: user.tenant_id } });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;
