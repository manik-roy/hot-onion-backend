const mongoose = require('mongoose');

const foodsSchema = new mongoose.Schema({
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
  }
})

const Foods = mongoose.model('Foods', foodsSchema);
module.exports = Foods;