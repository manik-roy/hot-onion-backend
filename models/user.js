const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  displayName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    photo: {
        type: String,
        trim: true,
    },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
