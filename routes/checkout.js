const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
const User = require('../models/User');
const Product = require('../models/Product');

// Render checkout page
router.get('/:productId', isLoggedIn, async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render('checkout', { product ,user:req.user});
    } catch (err) {
        console.error('Error rendering checkout page:', err);
        res.status(500).send('Server Error');
    }
});

// Handle checkout
router.post('/', isLoggedIn, async (req, res) => {
    try {
        const userId = req.user._id;
        const { totalPrice, productId } = req.body;

        // Find the user by its ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // If productId is provided, add the product to the order
        let items = [];
        if (productId) {
            const product = await Product.findById(productId);
            if (product) {
                items.push(product._id);
            }
        } else {
            items = user.cart;
        }

        // Create a new order object
        const order = {
            items: items,
            totalPrice: totalPrice,
            date: new Date()
        };

        // Add the order to the user's orders array
        user.orders.push(order);

        // Clear the user's cart if the order is from the cart
        if (!productId) {
            user.cart = [];
        }
        await user.save();

        res.status(200).send("Order confirmed")
    } catch (err) {
        console.error('Error processing checkout:', err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;