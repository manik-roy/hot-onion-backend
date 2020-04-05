const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  carts:[{
    title:{
      type:String,
      required:true,
      trim:true,
      maxlength:110
    },
    subtitle:{
      type:String,
      required:true,
      trim:true,
      maxlength:110
    },
    description:{
      type:String,
      required:true,
      trim:true,
    },
    img:{
      type:String,
      required:true,
    },
    catagories:{
      type:String,
      required:true,
      trim:true,
    },
    price:{
      type:Number,
      required:true
    },
    proTotalPrice:{
      type:Number,
      required:true
    },
    productId:{
      type: mongoose.Schema.Types.ObjectId,
    },
    isComplete: {
      type:Boolean,
      default:false
    },
    quantity:{
      type:Number,
      required:true
    },
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;