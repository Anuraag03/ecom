// server.js
const express = require('express');
const session = require('express-session');
const connectDB = require('./config/db');
const path = require('path');
const expressLayouts = require('express-ejs-layouts'); // Add this line

const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const app = express();
require("dotenv").config();
// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(flash());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET, // Provide secret option directly
  resave: false,
  saveUninitialized: true
}));


// EJS setup
app.use(expressLayouts); // Add this line
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main'); // Add this line - specifies default layout
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/products', require('./routes/products'));
app.use('/shop', require('./routes/shop'));
app.use('/user', require('./routes/user'));
app.use('/checkout', require('./routes/checkout'));
app.use('/cart',require('./routes/cart'));

// Add root route
app.get('/',(req, res) => {
  
  res.render('shop/index', { products: [], user: req.user,searchQuery:'' });
  

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));