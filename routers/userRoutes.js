const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();


// get User with email
router.get('/email/:email', userControllers.getUserByEmail)

router
    .route('/')
    .get(userControllers.getALlUsers)
    .post(userControllers.createUser);

router
    .route('/:id')
    .get(userControllers.getSingleUser)
    .put(userControllers.updateUser)
    .delete(userControllers.deleteUser);

module.exports = router;
