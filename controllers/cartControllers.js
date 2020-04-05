const Cart = require('../models/cart');

// GET ALL CARTS
const getAllCart = async (req, res) => {
  const carts = await Cart.find()
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      carts,
    },
  });
}

// GET A SINGLE CATS
const getSingleUserCart = async (req, res) => {
  try {
    const cart = await Cart.find({user:req.params.id});
    res.status(200).json({
      status: 'success',
      data: {
        cart,
      },
    });
  } catch {
    res.status(400).json({
      status: 'fail',
      message:'Error'
    });
  }
}

// CREATE A CART
const createCart = async (req, res) => {
 
  let item = {...req.body}
  const allCart = await Cart.find();
  
  let isExist = allCart.find(e => {
    if(item.productId == e.productId && e.user == item.user) {
      return e;
    }
    
  })
  
  if(!isExist) {
    item.proTotalPrice = item.quantity * item.price;
    const cart = await Cart.create(item)
    res.status(201).json({
      status: 'success',
      data: {
        cart,
      },
    });
  } 
  else {
    isExist.quantity = isExist.quantity + item.quantity
    isExist.proTotalPrice = isExist.price * isExist.quantity
    const cart = await Cart.findByIdAndUpdate(isExist._id, isExist, { new: true, runValidators: true });
    res.status(201).json({
      status: 'success',
      data: {
        cart,
      },
    });
  }  


}

// UPDATE A CART 
const updateCart = async (req, res) => {
  try {
    const cartIdes = req.body;
    console.log(cartIdes);
    await cartIdes.forEach( async item => {
      await Cart.updateMany({ _id: item  },{ $set: {isComplete:true } },{ new: true, runValidators: false } )
    })
    res.status(201).json({
      status: 'success',
      message:'update successfully'
    });
  } catch (error) {
    console.log(error);
  }

}

// DELETE A CART 
const deleteCart = async (req, res) => {
  const cart = await Cart.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      massage: 'Delete Successfully',
    },
  });
}

module.exports = {
  getAllCart,
  getSingleUserCart,
  updateCart,
  createCart,
  deleteCart
}