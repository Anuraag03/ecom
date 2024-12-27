const userModel = require('../models/User');
const bcrypt = require('bcrypt');
const {generateToken} = require('../utils/generateToken');
module.exports.registerUser  = async (req, res) => {
   try{
   
       let {email, password,fullname} = req.body;
       
       let user = await userModel.findOne({email:email});
       if(user) return res.status(401).send("user already exists");

       
       bcrypt.hash(password, 10, async (err, hash) => {
           if(err) throw err;
           else{
       
       let user = await userModel.create({
           email,
           password: hash,
           fullname
       });
       let token = generateToken(user);
       res.cookie("token",token);
       res.redirect('/shop')
   }
     });
   } catch(err){
       res.status(500).send(err.message);}
};

module.exports.loginUser = async (req, res) => {
    try{
         let {email, password} = req.body;
         let user = await userModel.findOne({email:email});
         if(!user) return res.status(404).send("Email or Password Incorrect");
         bcrypt.compare(password, user.password, (err, result) => {
                if(err) throw err;
                if(!result) return res.status(401).send("Email or Password Incorrect");
                let token = generateToken(user);
                res.cookie("token", token);
                res.redirect("/shop");
        });
    }
    catch(err){
        res.status(500).send(err.message);
    }

};

module.exports.logoutUser = async(req,res)=>{
    res.cookie("token","");
    res.redirect("/");
}
