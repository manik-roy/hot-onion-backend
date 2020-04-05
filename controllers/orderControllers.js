const Order = require('../models/completeOrder');

// GET ALL ORDERS
const getAllOrder = async (req, res) => {
  const orders = await Order.find()
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      orders,
    },
  });
}

// GET A SINGLE USER ORDERS
const getSingleUserOrder = async (req, res) => {

  try {
    const order = await Order.find({user:req.params.id});
    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch(err) {
    console.log(err);
    
    res.status(400).json({
      status: 'fail',
      message:'Error'
    });
  }

}

// CREATE A ORDER
const createOrder = async (req, res) => {
  const item = {...req.body}
  try {
    const order = await Order.create(item)
    res.status(201).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      message:'Order create fail, try again!'
    });
  }
 
}

module.exports = {
  getAllOrder,
  getSingleUserOrder,
  createOrder,
}