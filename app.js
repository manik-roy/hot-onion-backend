const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors())

// Routes

app.get('/', (req, res) => {
    res.send('Server is ok')
})

// unHandler routes
app.all('*', (req, res) => {
    res.send('not found')
});

module.exports = app;
