const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const isLoggedIn = require('../middleware/isLoggedIn');
const upload = require("../config/multer-config");
router.get('/create', isLoggedIn, (req, res) => {
  res.render('products/create',{user:req.user});
});

router.post('/create',isLoggedIn,upload.single("image"),async (req,res)=>{
  try{let {name,description,price,image} = req.body; 
        let product = await Product.create({
            image:req.file.buffer,
            name, 
            price,
            seller:req.user._id,
            description
        });
        await product.save();
        
        res.redirect("/shop");
    }
        catch(err){
            res.send(err.message);
        }
});

router.get('/search', isLoggedIn, async (req, res) => {
  try {
      const searchQuery = req.query.query;
      const regex = new RegExp(searchQuery, 'i'); // case-insensitive regex
      const products = await Product.find({
          $or: [
              { name: regex },
              { description: regex }
          ],
          seller: { $ne: req.user._id } // exclude products sold by the current user
      });

      res.render('shop/index', { user:req.user,products,cart:req.user.cart, searchQuery });
  } catch (err) {
      console.error('Error searching products:', err);
      res.status(500).send('Server Error');
  }
});



module.exports = router;