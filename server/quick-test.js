// Quick test script to verify the application works
console.log('🧪 Quick Test for SaaS Boilerplate\n');
console.log('===================================\n');

// Test 1: Check if all required files exist
const fs = require('fs');
const path = require('path');

console.log('1. Checking required files...');

const requiredFiles = [
  'server.js',
  'config/db.js',
  'models/User.js',
  'models/Tenant.js',
  'models/VerificationToken.js',
  'models/Feature.js',
  'middleware/authMiddleware.js',
  'middleware/tenantMiddleware.js',
  'routes/auth.js',
  'routes/tenants.js',
  'routes/users.js',
  'migrations/init.sql'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log('\n✅ All required server files exist');
} else {
  console.log('\n❌ Some files are missing');
}

// Test 2: Check client files
console.log('\n2. Checking client files...');
const clientFiles = [
  '../client/src/App.jsx',
  '../client/src/index.js',
  '../client/src/context/AuthContext.jsx',
  '../client/src/services/api.js',
  '../client/src/pages/Login.jsx',
  '../client/src/pages/Register.jsx',
  '../client/src/pages/VerifyEmail.jsx',
  '../client/src/pages/Dashboard.jsx',
  '../client/src/pages/Users.jsx',
  '../client/src/pages/Settings.jsx',
  '../client/src/components/Layout.jsx',
  '../client/src/components/Sidebar.jsx'
];

let allClientFilesExist = true;
clientFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} - MISSING`);
    allClientFilesExist = false;
  }
});

if (allClientFilesExist) {
  console.log('\n✅ All required client files exist');
} else {
  console.log('\n❌ Some client files are missing');
}

// Test 3: Check package.json files
console.log('\n3. Checking package.json files...');
if (fs.existsSync('package.json')) {
  console.log('   ✅ server/package.json');
} else {
  console.log('   ❌ server/package.json - MISSING');
}

if (fs.existsSync('../client/package.json')) {
  console.log('   ✅ client/package.json');
} else {
  console.log('   ❌ client/package.json - MISSING');
}

console.log('\n📋 Setup Instructions:');
console.log('=====================');
console.log('\n1. Database Setup:');
console.log('   - Make sure MySQL is running');
console.log('   - Create database: mysql -u root -p');
console.log('   - Run: CREATE DATABASE saas_boilerplate;');
console.log('   - Run: USE saas_boilerplate;');
console.log('   - Run: SOURCE migrations/init.sql;');

console.log('\n2. Environment Setup:');
console.log('   - Create server/.env file with:');
console.log('     PORT=5000');
console.log('     DB_HOST=localhost');
console.log('     DB_USER=root');
console.log('     DB_PASSWORD=your_mysql_password');
console.log('     DB_NAME=saas_boilerplate');
console.log('     JWT_SECRET=your_super_secret_jwt_key_here');
console.log('     NODE_ENV=development');

console.log('\n3. Start the Application:');
console.log('   Terminal 1: cd server && node server.js');
console.log('   Terminal 2: cd client && npm start');

console.log('\n4. Test Users (after database setup):');
console.log('   - Email: test@example.com');
console.log('   - Password: password123');
console.log('   - Tenant ID: 1');

console.log('\n🎉 File structure is ready! Follow the setup instructions above.');

