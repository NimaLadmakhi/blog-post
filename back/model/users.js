const mongoose = require('mongoose');
const schema = mongoose.Schema;
const model = new schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        required: true
    },
    updatedAt: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: true
    },
    postsCollection: {
        type: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'posts' }],
    }
});
module.exports = mongoose.model('users', model);