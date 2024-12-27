const jwt = require('jsonwebtoken');
const userModel = require('../models/User');

const isLoggedIn = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash("error", "You are not logged in");
        return res.redirect('/');
    }
    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel.findOne({ email: decoded.email }).select('-password');
        if (!user) {
            req.flash("error", "User not found");
            return res.redirect('/');
        }
        req.user = user;
        next();
    } catch (err) {
        req.flash("error", "Invalid token");
        return res.redirect('/');
    }
};

module.exports = isLoggedIn;