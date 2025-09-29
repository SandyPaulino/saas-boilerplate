// Server startup script with environment variables
process.env.PORT = '5000';
process.env.DB_HOST = 'localhost';
process.env.DB_USER = 'root';
process.env.DB_PASSWORD = ''; // ADD YOUR MYSQL PASSWORD HERE
process.env.DB_NAME = 'saas_boilerplate';
process.env.JWT_SECRET = 'your_super_secret_jwt_key_here_make_it_long_and_random_12345';
process.env.NODE_ENV = 'development';
process.env.EMAIL_SERVICE = 'gmail';
process.env.EMAIL_API_KEY = 'your_email_password_here';
process.env.EMAIL_FROM = 'your_email@gmail.com';

// Start the server
require('./server/server.js');

