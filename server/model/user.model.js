const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    bloodgroup: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
