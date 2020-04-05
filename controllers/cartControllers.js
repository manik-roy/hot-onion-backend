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
  console.log('body data =>', item);

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

    // await cartIdes.forEach( async item => {
    //   await Cart.updateMany({ _id: item  },{ $set: {isComplete:true } },{ new: true, runValidators: false } )
    // })
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: false });

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
  console.log('delete many', req.body);

  const cartIdes = req.body;
  await cartIdes.forEach(async item => {
    await Cart.findByIdAndDelete(item)
  })
  res.status(200).json({
    status: 'success',
    data: {
      massage: 'Delete Successfully',
    },
  });

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
  deleteCart,
  deleteManyItem
}