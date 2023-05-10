const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferenceEnum = require('./PreferenceEnum')

const preferenceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bio: {
        type: String,
    },
    photoes: [{
        type: String
    }],
    course: {
        type: String,
        enum: preferenceEnum.course
    },
    hobbies: {
        type: String,
        enum: preferenceEnum.hobbies
    },
    music: {
        type: String,
        enum: preferenceEnum.music
    },
    movies: {
        type: String,
        enum: preferenceEnum.movies
    },
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
