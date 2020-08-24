const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String
    },
    createdTime: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
        default: 'abobrov'
    },
    priority: {
        type: Number,
        default: 3
    },
    status: {
        type: String,
        default: 'new'
    }
});

module.exports = User = mongoose.model("todo", TodoSchema);
