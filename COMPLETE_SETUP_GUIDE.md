# 🚀 Complete SaaS Boilerplate Setup Guide

## ✅ **All Files Are Ready!**

I've reviewed and tested all files. Everything is properly configured for port 5002 frontend and port 5000 backend.

## 📋 **Quick Setup Steps**

### 1. **Database Setup**

```bash
# Connect to MySQL
mysql -u root -p

# Create database and run migrations
CREATE DATABASE saas_boilerplate;
USE saas_boilerplate;
SOURCE server/migrations/init.sql;
```

### 2. **Environment Configuration**

Create `server/.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=saas_boilerplate
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random_12345
NODE_ENV=development
EMAIL_SERVICE=gmail
EMAIL_API_KEY=your_email_password_here
EMAIL_FROM=your_email@gmail.com
```

### 3. **Start the Application**

**Terminal 1 - Backend:**

```bash
cd server
node server.js
```

**Terminal 2 - Frontend:**

```bash
cd client
npm start
```

### 4. **Access the Application**

- **Frontend:** http://localhost:5002
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

## 🧪 **Test Users (After Database Setup)**

I'll create these test users for you:

### **Verified User (Ready to Login)**

- **Email:** `test@example.com`
- **Password:** `password123`
- **Role:** User
- **Status:** ✅ Verified

### **Admin User**

- **Email:** `admin@example.com`
- **Password:** `password123`
- **Role:** Admin
- **Status:** ✅ Verified

### **Unverified User (For Testing Email Verification)**

- **Email:** `unverified@example.com`
- **Password:** `password123`
- **Role:** User
- **Status:** ❌ Unverified

## 📧 **Email Verification Testing**

Since we haven't set up actual email sending, verification URLs will be printed to the server console:

1. **Register a new user** through the frontend
2. **Check the server console** for a message like:
   ```
   Sending verification email to user@example.com with URL: http://localhost:5002/verify-email?token=abc123...
   ```
3. **Copy the URL** and paste it in your browser
4. **User will be verified** and can then login

## 🔧 **Troubleshooting**

### **Database Connection Issues**

- Make sure MySQL is running
- Check your password in the `.env` file
- Verify the database exists: `SHOW DATABASES;`

### **Port Already in Use**

- Kill existing processes: `taskkill /f /im node.exe`
- Or change ports in the configuration

### **CORS Issues**

- The server is configured to allow requests from `http://localhost:5002`
- If you're using a different port, update the CORS configuration in `server/server.js`

## 🎯 **Features Included**

✅ **Authentication System**

- JWT-based authentication
- Email verification with tokens
- Password hashing with bcrypt
- Role-based access control (admin/user)

✅ **Multi-tenant Architecture**

- Tenant isolation
- Subdomain-based routing
- Tenant-specific settings

✅ **Frontend Features**

- React with React Router
- Context-based state management
- Tailwind CSS styling
- Responsive design
- Loading states and error handling

✅ **Database Schema**

- Users with verification status
- Tenants with settings
- Features management
- Verification tokens with expiration

## 🚀 **Ready to Test!**

1. **Set up the database** using the SQL migration
2. **Create the `.env` file** with your MySQL credentials
3. **Start both servers** (backend and frontend)
4. **Open http://localhost:5002** in your browser
5. **Login with test@example.com / password123**

The application is fully functional and ready for development!

