const express = require('express');
const cors = require('cors');
const foodRoutes = require('./routers/foodRoutes');
const userRoutes = require('./routers/userRoutes');
const cartRoutes = require('./routers/cartRoutes')
const orderRoutes = require('./routers/orderRoutes');
const app = express();
app.use(express.json());
app.use(cors())

// Routes
app.use('/api/v1/foods', foodRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/carts', cartRoutes);
app.use('/api/v1/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send({message:'Welcome red Onion!'})
})

// unHandler routes
app.all('*', (req, res) => {
    res.send({message:'Not found'})
});

module.exports = app;
