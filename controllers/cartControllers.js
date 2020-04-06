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
    const cart = await Cart.find({ user: req.params.id });
    res.status(200).json({
      status: 'success',
      data: {
        cart,
      },
    });
  } catch {
    res.status(400).json({
      status: 'fail',
      message: 'Error'
    });
  }
}

// CREATE A CART
const createCart = async (req, res) => {
  let item = { ...req.body }
  const allCart = await Cart.findOne({ user: item.user });
  if (allCart) {
    let isExist = allCart.carts.find(pd => pd.productId == item.carts[0].productId)
    if (!isExist) {

      item.carts[0].proTotalPrice = item.carts[0].quantity * item.carts[0].price;
      allCart.carts.push(item.carts[0])
      const cart = await Cart.findOneAndUpdate({ user: item.user }, allCart, { new: true, runValidators: false });
      res.status(201).json({
        status: 'success',
        data: {
          cart,
        },
      });

    } else {

      isExist.quantity = isExist.quantity + item.carts[0].quantity;
      isExist.proTotalPrice = isExist.price * isExist.quantity;
      let index = allCart.carts.indexOf( isExist._id);
      allCart.carts[index] = isExist;
      const cart = await Cart.findOneAndUpdate({ user: item.user }, allCart, { new: true, runValidators: false });

    }
  } else {
    const cart = await Cart.create(item)
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
    
    let index = 0;
    const allCartItem = await Cart.findOne({user:req.body.user});
    const isExist = allCartItem.carts.filter((item, i) => {
      if(item._id == req.params.id) {
        index = i;
        return item;
      }
    });
         
    isExist[0].quantity = req.body.quantity;
    isExist[0].proTotalPrice = isExist[0].quantity * isExist[0].price;
    allCartItem.carts[index] = isExist[0];

    const cart = await Cart.findByIdAndUpdate(allCartItem._id, allCartItem, { new: true, runValidators: false });

    res.status(201).json({
      status: 'success',
      message: 'update successfully'
    });
  } catch (error) {
    console.log(error);
  }

}

// DELETE A CART 
const deleteManyItem = async (req, res) => {

  await Cart.findOneAndDelete({user:req.params.id})
  res.status(200).json({
    status: 'success',
    data: {
      massage: 'Delete Successfully',
    },
  });

}

// DELETE A CART 
const deleteCart = async (req, res) => {
 console.log(req.params.id);
 
  const cart = await Cart.findOne({user:req.query.user});
  var newCarts = cart.carts.filter(item => item._id != req.params.id)
  cart.carts = newCarts
  await Cart.findByIdAndUpdate(cart._id, cart, { new: true, runValidators: false })
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
  deleteCart,
  deleteManyItem
}