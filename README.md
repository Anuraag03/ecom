# E-commerce Platform

A full-stack e-commerce platform built with Node.js, Express, MongoDB, and EJS. This application allows users to buy and sell products, manage their listings, and includes user authentication.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-%3E%3D%204.4-green)

## Features

### User Authentication
- Secure user registration and login
- Password hashing using bcrypt
- Session-based authentication
- Protected routes

### Product Management
- Create, read, update, and delete product listings
- Image URL support for product images
- Product search functionality
- Categorization and filtering options

### User Dashboard
- Personal profile management
- Product listing management
- Order history tracking
- User-specific views

### Shopping Features
- Browse all available products
- Search functionality
- Responsive product grid
- Seller information display

## Technologies Used

- **Backend**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - Express-session for authentication
  - Bcrypt for password hashing

- **Frontend**
  - EJS (Embedded JavaScript templates)
  - TailwindCSS for styling
  - Responsive design

- **Security**
  - Input validation
  - Password encryption
  - Session management
  - Protected routes

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (>= 14.0.0)
- MongoDB (>= 4.4)
- npm or yarn package manager
- Git

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ecommerce-platform.git
cd ecommerce-platform
```

2. Install dependencies
```bash
npm install express mongoose express-session express-ejs-layouts cookie-parser ejs dotenv multer jsonwebtoken bcrypt connect-flash
```

3. Create a .env file in the root directory and add your environment variables
```env
PORT=3000
JWT_KEY
EXPRESS_SESSION_SECRET=your_session_secret
```

5. Start the application
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Usage

After installation, navigate to `http://localhost:3000` in your web browser.

### User Registration and Login
1. Click "Sign Up" to create a new account
2. Fill in required information (name, email, password)
3. Login with your credentials

### Selling Products
1. Click "Sell" in the navigation bar
2. Fill in product details:
   - Product name
   - Description
   - Price
   - Image 

### Buying Products
1. Browse available products on the shop page
2. Use the search functionality to find specific items
3. View product details including seller information

### Managing Your Account
1. Access your profile through "My Account"
2. View and edit your listings
3. Track your order history

## Security

- All passwords are hashed using bcrypt
- Session-based,JWT authentication
- Input validation on all forms
- Protected routes using middleware
- MongoDB injection protection

## Future Enhancements

- [ ] Payment gateway integration
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Product categories and filters
- [ ] User ratings and reviews
- [ ] Admin dashboard
- [ ] Image upload functionality
- [ ] Shopping cart
- [ ] Order management system

## Acknowledgments

- Node.js community
- Express.js framework
- MongoDB team
- TailwindCSS team
