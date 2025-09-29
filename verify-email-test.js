// Email verification test script
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', // Add your MySQL password here
  database: 'saas_boilerplate'
};

async function testEmailVerification() {
  console.log('📧 Testing Email Verification Flow...\n');

  try {
    const connection = await mysql.createConnection(dbConfig);

    // Get the latest verification token
    const [tokens] = await connection.execute(
      'SELECT * FROM verification_tokens ORDER BY id DESC LIMIT 1'
    );

    if (tokens.length === 0) {
      console.log('❌ No verification tokens found. Please register a user first.');
      return;
    }

    const token = tokens[0];
    console.log(`Found verification token: ${token.token}`);
    console.log(`Expires: ${token.expires}`);

    // Test verification URL
    const verificationUrl = `http://localhost:5002/verify-email?token=${token.token}`;
    console.log(`\n🔗 Verification URL: ${verificationUrl}`);

    // Test the verification endpoint
    console.log('\n🧪 Testing verification endpoint...');
    const response = await fetch(`http://localhost:5000/api/auth/verify/${token.token}`);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Email verification successful:', result.message);
    } else {
      const error = await response.text();
      console.log('❌ Email verification failed:', error);
    }

    await connection.end();

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testEmailVerification();

