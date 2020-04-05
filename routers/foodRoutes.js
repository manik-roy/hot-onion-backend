const express = require('express');
const foodsControllers = require('../controllers/foodControllers');
const router = express.Router();

router
    .route('/')
    .get(foodsControllers.getALlFoods)
    .post(foodsControllers.createFoods);

router
    .route('/:id')
    .get(foodsControllers.getSingleFood)
    .put(foodsControllers.updateFood)
    .delete(foodsControllers.deleteFood);

module.exports = router;
