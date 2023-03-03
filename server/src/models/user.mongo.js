const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    emailAddress: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        type: mongoose.Schema.Types.Mixed,
        unique: true
    },
    password: {
        type: String,
        type: mongoose.Schema.Types.Mixed,
        requied: true
    }},
    {
        collation: { locale: 'en_US', strength: 1 }
    }
);

module.exports = mongoose.model('user', userSchema);