const asyncHandler = require('express-async-handler');
const Preference = require('../model/Preference');
const PreferenceEnum = require('../model/PreferenceEnum');
const axios = require('axios')

exports.allEnums = asyncHandler(async (req, res) => {
    res.status(200).json(PreferenceEnum.preferenceEnum)
})

exports.addImages = asyncHandler(async (req, res) => {
    const id = req.user._id;
    const images = req.files;
    let userPref = await Preference.findOne({ user: id });
    if (!userPref) {
        userPref = new Preference({
            user: req.user._id,
        });
    }
    if (!images || images.length === 0) {
        return res.status(400).json({ error: 'Please provide at least one image' });
    }

    if (images.length > 5) {
        return res.status(400).json({ error: 'You can upload a maximum of 5 images' });
    }

    const imageUrls = [];

    const headers = {
        Authorization: `Client-ID ${process.env.IMGUR_ID}`,
    };
    // console.log(images)
    for (let i = 0; i < images.length; i++) {
        const body = {
            image: images[i].buffer.toString('base64'), // Convert the file buffer to a base64-encoded string
            type: 'base64'
        };

        try {
            const response = await axios.post('https://api.imgur.com/3/image', body, { headers });

            imageUrls.push(response.data.data.link);
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ message: 'Something went wrong' });
        }
    }
    // console.log(imageUrls)
    userPref.photoes = imageUrls;
    await userPref.save();
    res.status(201).json({ userPref });
})

exports.prefer = asyncHandler(async (req, res) => {
    const id = req.user._id;
    const userPref = await Preference.findOne({ user: id });
    if (!userPref) {
        const prefer = new Preference();
        res.status(200).json(prefer)
    }
    res.status(200).json(userPref);
})

exports.addBio = asyncHandler(async (req, res) => {
    const id = req.user._id;
    const { bio } = req.body;
    let userPref = await Preference.findOne({ user: id });
    if (!userPref) {
        userPref = new Preference({
            user: id,
        });
    }
    userPref.bio = bio;
    userPref.save();
    res.status(200).json(userPref.bio);
})

exports.addAbout = asyncHandler(async (req, res) => {
    const id = req.user._id;
    const { course, personality, sociality } = req.body;
    let userPref = await Preference.findOne({ user: id });
    if (!userPref) {
        userPref = new Preference({
            user: id,
        });
    }
    userPref.course = course;
    userPref.personality = personality;
    userPref.sociality = sociality;
    console.log(sociality)
    userPref.save();
    res.status(200).json(userPref);
})

exports.addInterests = asyncHandler(async (req, res) => {
    const id = req.user._id;
    const { movies, hobbies, music } = req.body;
    let userPref = await Preference.findOne({ user: id });
    if (!userPref) {
        userPref = new Preference({
            user: id,
        });
    }
    userPref.movies = movies;
    userPref.hobbies = hobbies;
    userPref.music = music;
    userPref.save();
    res.status(200).json(userPref);
})
