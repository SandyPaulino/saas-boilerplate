// Test script to verify the SaaS boilerplate setup
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', // Add your MySQL password here
  database: 'saas_boilerplate'
};

async function testSetup() {
  console.log('🧪 Testing SaaS Boilerplate Setup...\n');

  try {
    // Test database connection
    console.log('1. Testing database connection...');
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Database connected successfully\n');

    // Test creating a test user
    console.log('2. Creating test user...');
    const testEmail = 'test@example.com';
    const testPassword = 'password123';
    const hashedPassword = await bcrypt.hash(testPassword, 10);
    
    // Check if user already exists
    const [existingUsers] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [testEmail]
    );

    if (existingUsers.length > 0) {
      console.log('✅ Test user already exists');
    } else {
      // Create test user
      await connection.execute(
        'INSERT INTO users (email, password, tenant_id, role, verified, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
        [testEmail, hashedPassword, 1, 'user', true] // Set verified to true for testing
      );
      console.log('✅ Test user created successfully');
    }

    // Test JWT token generation
    console.log('\n3. Testing JWT token generation...');
    const testToken = jwt.sign(
      { email: testEmail, tenant_id: 1 },
      'your_super_secret_jwt_key_here_make_it_long_and_random_12345',
      { expiresIn: '1d' }
    );
    console.log('✅ JWT token generated successfully');

    // Test verification token
    console.log('\n4. Testing verification token...');
    const verificationToken = require('crypto').randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
    await connection.execute(
      'INSERT INTO verification_tokens (user_id, token, expires) VALUES (?, ?, ?)',
      [1, verificationToken, expires]
    );
    console.log('✅ Verification token created successfully');

    // Generate verification URL
    const verificationUrl = `http://localhost:5002/verify-email?token=${verificationToken}`;
    console.log(`\n📧 Verification URL: ${verificationUrl}`);

    // Test login credentials
    console.log('\n5. Test Login Credentials:');
    console.log('   Email: test@example.com');
    console.log('   Password: password123');
    console.log('   Tenant ID: 1');

    await connection.end();
    console.log('\n🎉 All tests passed! Your SaaS boilerplate is ready to use.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n🔧 Setup Instructions:');
    console.log('1. Make sure MySQL is running');
    console.log('2. Create database: mysql -u root -p < server/migrations/init.sql');
    console.log('3. Update database password in this script if needed');
    console.log('4. Run: node test-setup.js');
  }
}

testSetup();

