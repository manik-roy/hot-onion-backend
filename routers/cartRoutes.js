const express = require('express');
const cartControllers = require('../controllers/cartControllers');
const router = express.Router();

router.put('/deletes/:id', cartControllers.deleteManyItem)

router
    .route('/')
    .get(cartControllers.getAllCart)
    .post(cartControllers.createCart);

router
    .route('/:id')
    .get(cartControllers.getSingleUserCart)
    .put(cartControllers.updateCart)
    .delete(cartControllers.deleteCart);

module.exports = router;
