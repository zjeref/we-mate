const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['None', 'Male', 'Female']
    },
    avatar: {
        type: String
    },
    preference: {
        type: Schema.Types.ObjectId,
        ref: 'Preference'
    },
    swipedRight: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    swipedLeft: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    matched: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
