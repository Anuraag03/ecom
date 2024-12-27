const express = require('express');
const router = express.Router();
const Product= require('../models/Product');
const isLoggedIn = require('../middleware/isLoggedIn');

// Get user profile
router.get('/profile/:id', isLoggedIn, async (req, res) => {
    try {
        let products = await Product.find({seller:req.user._id});
        res.render('profile', { user:req.user ,products:products});
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Update user profile
router.post('/profile/edit/:id', isLoggedIn, async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = req.user;
        
        user.fullname = name;
        user.email = email;
        
        await user.save();
        
        res.redirect(`/user/profile/${user._id}`);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;