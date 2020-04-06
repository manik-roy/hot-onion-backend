const User = require('../models/user');

// GET ALL USERS
const getALlUsers = async (req, res) => {
  const users = await User.find()
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
}

// GET A SINGLE USER
const getSingleUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
}
// GET A SINGLE BY EMAIL
const getUserByEmail = async (req, res) => {
  
  const user = await User.findOne({email:req.params.email});  
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
}

// CREATE A USER
const createUser = async (req, res) => {
  
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400).json({
      status: 'fail',
      message: 'Email Already exist'
    });
  } else {
    const user = await User.create(req.body)
    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  }

}

// UPDATE A USER 
const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
}

// DELETE A USER 
const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      massage: 'Delete Successfully',
    },
  });
}

module.exports = {
  getALlUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail
}