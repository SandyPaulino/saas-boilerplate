// Complete setup and test script for SaaS Boilerplate
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Database configuration - UPDATE THESE VALUES
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', // ADD YOUR MYSQL PASSWORD HERE
  database: 'saas_boilerplate'
};

const JWT_SECRET = 'your_super_secret_jwt_key_here_make_it_long_and_random_12345';

async function setupAndTest() {
  console.log('🚀 SaaS Boilerplate Setup and Test\n');
  console.log('=====================================\n');

  try {
    // Step 1: Test database connection
    console.log('1. Testing database connection...');
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Database connected successfully\n');

    // Step 2: Check if tables exist
    console.log('2. Checking database tables...');
    const [tables] = await connection.execute('SHOW TABLES');
    const tableNames = tables.map(row => Object.values(row)[0]);
    
    const requiredTables = ['users', 'tenants', 'verification_tokens', 'features'];
    const missingTables = requiredTables.filter(table => !tableNames.includes(table));
    
    if (missingTables.length > 0) {
      console.log('❌ Missing tables:', missingTables.join(', '));
      console.log('Please run: mysql -u root -p < migrations/init.sql');
      return;
    }
    console.log('✅ All required tables exist\n');

    // Step 3: Create test tenant if it doesn't exist
    console.log('3. Setting up test tenant...');
    const [existingTenants] = await connection.execute('SELECT * FROM tenants WHERE id = 1');
    
    if (existingTenants.length === 0) {
      await connection.execute(
        'INSERT INTO tenants (id, name, subdomain, settings, created_at) VALUES (?, ?, ?, ?, NOW())',
        [1, 'Demo Tenant', 'demo', JSON.stringify({primaryColor: "#2563eb", logo: "default.png"})]
      );
      console.log('✅ Test tenant created');
    } else {
      console.log('✅ Test tenant already exists');
    }

    // Step 4: Create test users
    console.log('\n4. Creating test users...');
    
    // Test user 1 (verified)
    const testEmail1 = 'test@example.com';
    const testPassword = 'password123';
    const hashedPassword = await bcrypt.hash(testPassword, 10);
    
    const [existingUser1] = await connection.execute('SELECT * FROM users WHERE email = ?', [testEmail1]);
    
    if (existingUser1.length === 0) {
      await connection.execute(
        'INSERT INTO users (email, password, tenant_id, role, verified, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
        [testEmail1, hashedPassword, 1, 'user', true]
      );
      console.log('✅ Test user 1 created (verified)');
    } else {
      // Update existing user to be verified
      await connection.execute('UPDATE users SET verified = true WHERE email = ?', [testEmail1]);
      console.log('✅ Test user 1 updated (verified)');
    }

    // Test user 2 (unverified)
    const testEmail2 = 'unverified@example.com';
    const [existingUser2] = await connection.execute('SELECT * FROM users WHERE email = ?', [testEmail2]);
    
    if (existingUser2.length === 0) {
      await connection.execute(
        'INSERT INTO users (email, password, tenant_id, role, verified, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
        [testEmail2, hashedPassword, 1, 'user', false]
      );
      console.log('✅ Test user 2 created (unverified)');
    } else {
      console.log('✅ Test user 2 already exists');
    }

    // Admin user
    const adminEmail = 'admin@example.com';
    const [existingAdmin] = await connection.execute('SELECT * FROM users WHERE email = ?', [adminEmail]);
    
    if (existingAdmin.length === 0) {
      await connection.execute(
        'INSERT INTO users (email, password, tenant_id, role, verified, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
        [adminEmail, hashedPassword, 1, 'admin', true]
      );
      console.log('✅ Admin user created');
    } else {
      console.log('✅ Admin user already exists');
    }

    // Step 5: Create verification token for testing
    console.log('\n5. Creating verification token for testing...');
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
    // Get user ID for unverified user
    const [unverifiedUser] = await connection.execute('SELECT id FROM users WHERE email = ?', [testEmail2]);
    
    if (unverifiedUser.length > 0) {
      await connection.execute(
        'INSERT INTO verification_tokens (user_id, token, expires) VALUES (?, ?, ?)',
        [unverifiedUser[0].id, verificationToken, expires]
      );
      console.log('✅ Verification token created');
    }

    // Step 6: Generate test URLs and credentials
    console.log('\n6. Test Information:');
    console.log('===================');
    console.log('\n📧 Test Users:');
    console.log(`   Verified User: ${testEmail1} / ${testPassword}`);
    console.log(`   Unverified User: ${testEmail2} / ${testPassword}`);
    console.log(`   Admin User: ${adminEmail} / ${testPassword}`);
    console.log(`   Tenant ID: 1`);
    
    console.log('\n🔗 Verification URL:');
    const verificationUrl = `http://localhost:5002/verify-email?token=${verificationToken}`;
    console.log(`   ${verificationUrl}`);
    
    console.log('\n🌐 Application URLs:');
    console.log('   Frontend: http://localhost:5002');
    console.log('   Backend API: http://localhost:5000/api');
    console.log('   Health Check: http://localhost:5000/api/health');

    console.log('\n🧪 Test Steps:');
    console.log('1. Start the server: node server.js');
    console.log('2. Start the client: cd ../client && npm start');
    console.log('3. Open http://localhost:5002 in your browser');
    console.log('4. Try logging in with test@example.com / password123');
    console.log('5. Or register a new user and check server console for verification URL');

    await connection.end();
    console.log('\n🎉 Setup complete! Your SaaS boilerplate is ready to test.');

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure MySQL is running');
    console.log('2. Update the database password in this script');
    console.log('3. Run the database migration: mysql -u root -p < migrations/init.sql');
    console.log('4. Make sure the database "saas_boilerplate" exists');
  }
}

setupAndTest();

