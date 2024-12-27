const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({   
    fullname: {
        type:String,
        minLength:3,
        trim:true,
    },
    email: String,
    password: String,
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    orders: [{
        items: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }],
        totalPrice: Number,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    createdAt: {
      type: Date,
      default: Date.now
    },
    contact:Number,
    picture:String,
});

module.exports = mongoose.model('User', userSchema);    