const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const PORT = process.env.PORT || 3500;
const DB = process.env.DATABASE;

mongoose.connect(
    DB,
    { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true },
    err => {
        if (err) {
            console.log(err);
        } else {
            console.log('Database Connect Successfully!');
        }
    }
);

app.listen(PORT, () => console.log(`Server is running on the port http://localhost:${PORT}`));
