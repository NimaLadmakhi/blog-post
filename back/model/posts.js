const mongoose = require('mongoose');
const schema = mongoose.Schema;
const model = new schema({
    _id: mongoose.Schema.Types.ObjectId,
    imageUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('posts', model);