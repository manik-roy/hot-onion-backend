const Foods = require('../models/foods');
const { ObjectId } = require('mongoose').Types;

// GET ALL FOODS
const getALlFoods = async (req, res) => {
  const foods = await Foods.find()
  res.status(200).json({
    status: 'success',
    results: foods.length,
    data: {
      foods,
    },
  });
}

// GET A SINGLE FOOD
const getSingleFood = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid id'
    });
  } else {
  const food = await Foods.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      food,
    },
  });
}
}

// CREATE A FOOD ITEM
const createFoods = async (req, res) => {
  console.log(req.body);
  
  const food = await Foods.create(req.body)
  res.status(201).json({
    status: 'success',
    data: {
      food,
    },
  });
}

// UPDATE A FOOD ITEM
const updateFood = async (req, res) => {
  const food = await Foods.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  res.status(201).json({
    status: 'success',
    data: {
      food,
    },
  });
}

// DELETE A FOOD ITEM
const deleteFood = async (req, res) => {
  const food = await Foods.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      massage: 'Delete Successfully',
    },
  });
}

module.exports = {
  getALlFoods,
  getSingleFood,
  createFoods,
  updateFood,
  deleteFood
}