const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const Product = require('../models/Product');
const User = require('../models/User');

// Add product to cart
router.get('/addtocart/:id', isLoggedIn, async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.user._id;

        // Find the product by its ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Add the product to the user's cart
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.cart.push(product._id); // Push the ObjectId directly
        await user.save();

        res.redirect('/shop');
    } catch (err) {
        console.error('Error adding product to cart:', err);
        res.status(500).send('Server Error');
    }
});

router.get('/addmoretocart/:id', isLoggedIn, async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.user._id;

        // Find the product by its ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Add the product to the user's cart
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.cart.push(product._id); // Push the ObjectId directly
        await user.save();

        res.redirect('/cart');
    } catch (err) {
        console.error('Error adding product to cart:', err);
        res.status(500).send('Server Error');
    }
});

// Remove product from cart
router.get('/removefromcart/:id', isLoggedIn, async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.user._id;

        // Find the user by its ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Remove the product from the user's cart
        const productIndex = user.cart.findIndex(item => item.toString() === productId);
        if (productIndex > -1) {
            user.cart.splice(productIndex, 1);
        }
        await user.save();

        res.redirect('/cart');
    } catch (err) {
        console.error('Error removing product from cart:', err);
        res.status(500).send('Server Error');
    }
});

router.get('/deletefromcart/:id', isLoggedIn, async (req, res) => {
    try {
        const productId = req.params.id;
        const userId = req.user._id;

        // Find the user by its ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Remove the product from the user's cart
        user.cart = user.cart.filter(item => item.toString() !== productId);
        
        await user.save();

        res.redirect('/cart');
    } catch (err) {
        console.error('Error removing product from cart:', err);
        res.status(500).send('Server Error');
    }
});

// Get cart
router.get('/', isLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('cart');
       
        const orders = await Product.find({ _id: { $in: user.cart } });
        res.render('cart', { user: req.user, orders, });
    } catch (err) {
        res.redirect('/');
        res.status(500).send('Server Error');
    }
});

module.exports = router;