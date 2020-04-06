const mongoose = require('mongoose');

const completeOrderSchema = new mongoose.Schema({
  address: {
    type: String,
    trim: true,
  },
  homeNo: {
    type: String,
    trim: true,
  },
  flatNo: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  instruction: {
    type: String,
    trim: true,
  },
  payInfo:{
    type:Object
  },
  subTotal:{
    type:Number
  },
  cart: [Object],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true })

const Order = mongoose.model('Order', completeOrderSchema);
module.exports = Order;