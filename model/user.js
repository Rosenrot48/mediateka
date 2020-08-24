const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    Date: {
        type: Date,
        default: Date.now()
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    telephone: {
        type: String
    },
    verifiedEmail: {
        type: Boolean,
        default: false
    },
    password: {
        type: String
    }
});

module.exports = User = mongoose.model("users", UserSchema);
