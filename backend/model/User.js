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
    avatar: {
        type: String,
    },
    preference: {
        type: Schema.Types.ObjectId,
        ref: 'Preference'
    }
}, { timestamps: true });




module.exports = mongoose.model('User', userSchema);

