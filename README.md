# 🚀 SaaS Boilerplate

A complete, production-ready SaaS boilerplate built with **MySQL**, **Express**, **React**, and **JWT authentication**. Features multi-tenant architecture, email verification, and modern UI components.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange.svg)](https://mysql.com/)

## ✨ Features

### 🔐 **Authentication & Security**
- JWT-based authentication
- Email verification with secure tokens
- Password hashing with bcrypt
- Role-based access control (Admin/User)
- Multi-tenant architecture
- CORS protection

### 🎨 **Frontend**
- React 18 with React Router
- Tailwind CSS for styling
- Responsive design
- Context-based state management
- Modern UI components
- Loading states and error handling

### 🏗️ **Backend**
- Express.js REST API
- MySQL database with connection pooling
- Input validation with express-validator
- Modular architecture
- Error handling middleware
- Health check endpoints

### 📧 **Email System**
- Email verification flow
- Template-based emails
- Token-based verification
- Console output for development

## 🚀 Quick Start

### Prerequisites
- Node.js (>=18.x)
- MySQL (>=8.0)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/saas-boilerplate.git
   cd saas-boilerplate
   ```

2. **Install dependencies**
   ```bash
   # Server dependencies
   cd server && npm install
   
   # Client dependencies
   cd ../client && npm install
   ```

3. **Set up the database**
   ```bash
   # Create database
   mysql -u root -p
   CREATE DATABASE saas_boilerplate;
   
   # Run migrations
   mysql -u root -p saas_boilerplate < server/migrations/init.sql
   ```

4. **Configure environment variables**
   ```bash
   # Create server/.env file
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=saas_boilerplate
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   EMAIL_SERVICE=gmail
   EMAIL_API_KEY=your_email_password
   EMAIL_FROM=your_email@gmail.com
   ```

5. **Start the application**
   ```bash
   # Terminal 1 - Backend
   cd server && npm start
   
   # Terminal 2 - Frontend
   cd client && npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - Health Check: http://localhost:5000/api/health

## 🧪 Testing

### Test Users (After Database Setup)
- **Email:** `test@example.com`
- **Password:** `password123`
- **Status:** ✅ Pre-verified

### Email Verification
1. Register a new user
2. Check server console for verification URL
3. Copy URL to browser to complete verification

## 📁 Project Structure

```
saas-boilerplate/
├── server/                 # Backend API
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── migrations/       # Database migrations
│   └── server.js         # Main server file
├── client/                # Frontend React app
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React context
│   │   ├── services/     # API services
│   │   └── App.jsx       # Main app component
│   └── public/          # Static assets
├── docs/                 # Documentation
└── README.md
```

## 🛠️ Development

### Available Scripts

**Server:**
```bash
npm start          # Start production server
npm run dev        # Start with nodemon
```

**Client:**
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

### Database Schema

The application includes the following tables:
- `users` - User accounts with verification status
- `tenants` - Multi-tenant organization data
- `features` - Tenant-specific features
- `verification_tokens` - Email verification tokens

## 🔧 Configuration

### Environment Variables

**Server (.env):**
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=saas_boilerplate
JWT_SECRET=your_jwt_secret
NODE_ENV=development
EMAIL_SERVICE=gmail
EMAIL_API_KEY=your_email_password
EMAIL_FROM=your_email@gmail.com
```

**Client:**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚀 Deployment

### Production Setup

1. **Environment Configuration**
   - Set `NODE_ENV=production`
   - Configure production database
   - Set up email service (SendGrid, AWS SES)
   - Configure CORS for production domain

2. **Database Setup**
   ```bash
   mysql -u root -p < server/migrations/init.sql
   ```

3. **Build and Deploy**
   ```bash
   # Build client
   cd client && npm run build
   
   # Start server
   cd server && npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@yourcompany.com
- 📖 Documentation: [Wiki](https://github.com/yourusername/saas-boilerplate/wiki)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/saas-boilerplate/issues)

## 🎯 Roadmap

- [ ] Real email service integration
- [ ] Stripe billing integration
- [ ] Two-factor authentication
- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] API documentation
- [ ] Webhook system

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Web framework
- [React](https://reactjs.org/) - Frontend library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [MySQL](https://mysql.com/) - Database
- [JWT](https://jwt.io/) - Authentication

---

**⭐ Star this repository if you find it helpful!**