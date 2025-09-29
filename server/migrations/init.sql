CREATE DATABASE IF NOT EXISTS saas_boilerplate;

USE saas_boilerplate;

CREATE TABLE tenants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  subdomain VARCHAR(100) UNIQUE NOT NULL,
  settings JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  tenant_id INT NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

CREATE TABLE features (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tenant_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES tenants(id)
);

CREATE TABLE verification_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Seed data
INSERT INTO tenants (name, subdomain, settings) 
VALUES ('Demo Tenant', 'demo', '{"primaryColor": "#2563eb", "logo": "default.png"}');
