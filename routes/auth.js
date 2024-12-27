const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/login', (req, res) => {
  res.render('auth/login',{user:req.user});
});

router.get('/signup', (req, res) => {
  res.render('auth/signup',{user:req.user});
});
const {registerUser,loginUser,logoutUser} = require('../controllers/authController');
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/logout',logoutUser);

module.exports = router;
