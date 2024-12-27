const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn, async (req, res) => {
  try {
    const userId = req.user ? req.user._id : null;
    const products = await Product.find({ seller: { $ne: userId } }).populate('seller', 'name');
    let cart = [];

    if (userId) {
      const user = await User.findById(userId).populate('cart');
      cart = user.cart;
    }

    res.render('shop/index', { user: req.user, products, cart ,searchQuery:''});
  } catch (err) {
    console.error('Error fetching products or cart:', err);
    res.status(500).send('Server Error');
  }
});



module.exports = router;