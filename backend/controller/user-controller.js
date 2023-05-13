const User = require('../model/User');
const Preference = require('../model/Preference');
const asyncHandler = require('express-async-handler');
const axios = require('axios')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createAccount = asyncHandler(async (req, res) => {
    const { name, email, password, age, gender } = req.body;


    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
        return res.status(409).json({ error: 'Already exist' })
    }


    const encry_password = bcrypt.hashSync(password);
    const newUser = new User({
        name: name,
        email: email,
        password: encry_password,
        age: age,
        gender: gender,
    })
    await newUser.save();

    res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        token: generateToken(newUser._id)
    })
})

exports.verifyAccount = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email })

    if (!existingUser) {
        return res.status(404).json({ message: "Account doesn't exist" })
    }
    console.log(generateToken(existingUser._id))
    if (bcrypt.compare(password, existingUser.password)) {
        res.status(200).json({
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            avatar: existingUser.avatar,
            token: generateToken(existingUser._id)
        })
    }
    else {
        res.status(401).json({ message: "Password doesn't match" })
    }
})

exports.getAccount = asyncHandler(async (req, res) => {
    const id = req.user._id;
    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ message: "User does not exist" })

    res.status(200).json(user);
})

exports.getMe = asyncHandler(async (req, res) => {
    res.send(req.user);
})


exports.getUserMatches = asyncHandler(async (req, res) => {
    const currUser = req.user;
    const userId = currUser._id;
    // console.log(req.user)
    const user = await User.findById(userId).populate('preference');
    const preference = await Preference.findOne({ user: userId });

    const potentialMatches = await Preference.find({
        user: { $ne: userId },
    }).populate({
        path: 'user',
        select: '-password',
        populate: {
            path: 'preference',
            select: '-user -_id',
        },
    });

    const matches = potentialMatches.map(match => {
        let score = 0;
        const matchPreference = match;
        if (user.swipedLeft.includes(match.user._id) || user.swipedRight.includes(match.user._id)) {
            // exclude users that have already been swiped left or right
            return null;
        }
        if (preference.course === matchPreference.course) score++;
        if (preference.hobbies === matchPreference.hobbies) score++;
        if (preference.music === matchPreference.music) score++;
        if (preference.movies === matchPreference.movies) score++;
        if (preference.personality === matchPreference.personality) score++;
        if (preference.sociality === matchPreference.sociality) score++;

        return { user: match.user, score };
    }).filter(match => match !== null);

    matches.sort((a, b) => b.score - a.score);

    res.send(matches);
});

exports.leftSwipe = asyncHandler(async (req, res) => {
    const currUser = req.user;
    console.log("dsada")
    const userId = currUser._id;
    const {targetUser} = req.body;
    const user = await User.findById(userId);
    user.swipedLeft = [...user.swipedLeft, targetUser];
    user.save();
    res.send("Success")
})

exports.rightSwipe = asyncHandler(async (req, res) => {
    const currUser = req.user;
    const userId = currUser._id;
    const {targetUser} = req.body;
    const user = await User.findById(userId);
    user.swipedRight = [...user.swipedRight, targetUser];
    user.save();
    res.send("Success")
})

exports.getallUsers = asyncHandler(async (req, res) => {
    const allUsers = await User.find();
    res.send(allUsers)
})




const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
}