# Contributing to SaaS Boilerplate

Thank you for your interest in contributing to the SaaS Boilerplate! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js (>=18.x)
- MySQL (>=8.0)
- Git
- npm or yarn

### Development Setup

1. **Fork and clone the repository**
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
   mysql -u root -p < server/migrations/init.sql
   ```

4. **Configure environment variables**
   ```bash
   # Copy example environment file
   cp env.example server/.env
   
   # Edit server/.env with your database credentials
   ```

5. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd server && npm run dev
   
   # Terminal 2 - Frontend
   cd client && npm start
   ```

## 🛠️ Development Guidelines

### Code Style

- **JavaScript/Node.js**: Follow ESLint configuration
- **React**: Use functional components with hooks
- **CSS**: Use Tailwind CSS classes
- **Database**: Use prepared statements for all queries

### Commit Messages

Use conventional commit format:
```
type(scope): description

Examples:
feat(auth): add two-factor authentication
fix(api): resolve CORS issue
docs(readme): update installation instructions
```

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Add tests for new features
   - Update documentation if needed

3. **Test your changes**
   ```bash
   # Run server tests
   cd server && npm test
   
   # Run client tests
   cd client && npm test
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## 🧪 Testing

### Running Tests

```bash
# Server tests
cd server && npm test

# Client tests
cd client && npm test

# End-to-end tests
npm run test:e2e
```

### Writing Tests

- **Unit tests**: Test individual functions and components
- **Integration tests**: Test API endpoints
- **E2E tests**: Test complete user workflows

## 📝 Documentation

### Code Documentation

- Use JSDoc for functions and classes
- Add inline comments for complex logic
- Update README.md for new features

### API Documentation

- Document all new API endpoints
- Include request/response examples
- Update OpenAPI/Swagger specs

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment details**
   - Node.js version
   - Operating system
   - Browser (for frontend issues)

2. **Steps to reproduce**
   - Clear, numbered steps
   - Expected vs actual behavior

3. **Additional context**
   - Screenshots if applicable
   - Error messages
   - Log files

## ✨ Feature Requests

When suggesting features:

1. **Check existing issues** first
2. **Describe the use case** clearly
3. **Explain the benefits** to users
4. **Consider implementation** complexity

## 🏗️ Architecture Guidelines

### Backend (Express.js)

- **Controllers**: Handle HTTP requests/responses
- **Models**: Database operations and business logic
- **Middleware**: Authentication, validation, error handling
- **Routes**: API endpoint definitions

### Frontend (React)

- **Components**: Reusable UI components
- **Pages**: Route-level components
- **Context**: Global state management
- **Services**: API communication

### Database (MySQL)

- **Migrations**: Version-controlled schema changes
- **Indexes**: Optimize query performance
- **Relationships**: Proper foreign key constraints
- **Security**: Use prepared statements

## 🔒 Security Guidelines

- **Never commit** sensitive data (passwords, API keys)
- **Validate all inputs** on both client and server
- **Use HTTPS** in production
- **Implement rate limiting** for API endpoints
- **Sanitize user inputs** to prevent XSS/SQL injection

## 📦 Dependencies

### Adding New Dependencies

**Server:**
```bash
cd server
npm install package-name
```

**Client:**
```bash
cd client
npm install package-name
```

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update packages
npm update
```

## 🚀 Release Process

1. **Update version numbers**
2. **Update CHANGELOG.md**
3. **Create release notes**
4. **Tag the release**
5. **Deploy to production**

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Email**: support@yourcompany.com

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to SaaS Boilerplate! 🎉
