const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferenceEnum = require('./PreferenceEnum')

const preferenceSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    stream: {
        type: String,
        enum: preferenceEnum.stream
    },
    hobbies: [{
        type: String,
        enum: preferenceEnum.hobbies
    }],
    music: [{
        type: String,
        enum: preferenceEnum.music
    }],
    movies: [{
        type: String,
        enum: preferenceEnum.movies
    }],
    personality: {
        type: String,
        enum: preferenceEnum.personality
    },
    sociality: {
        type: String,
        enum: preferenceEnum.sociality
    }
})




module.exports = mongoose.model('Preference', preferenceSchema);
