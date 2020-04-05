const express = require('express');
const orderControllers = require('../controllers/orderControllers');
const router = express.Router();

router
    .route('/')
    .get(orderControllers.getAllOrder)
    .post(orderControllers.createOrder);

router
    .route('/:id')
    .get(orderControllers.getSingleUserOrder)

module.exports = router;
