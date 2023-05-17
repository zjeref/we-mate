const User = require('../model/User');
const Preference = require('../model/Preference');
const Message = require('../model/Message');
const asyncHandler = require('express-async-handler');
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
    res.json(req.user);
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
        if (preference.course === matchPreference.course) score += 20;
        if (preference.hobbies === matchPreference.hobbies) score += 10;
        if (preference.music === matchPreference.music) score += 10;
        if (preference.movies === matchPreference.movies) score += 10;
        if (preference.personality === matchPreference.personality) score += 20;
        if (preference.sociality === matchPreference.sociality) score += 30;

        return { user: match.user, score };
    }).filter(match => match !== null);

    matches.sort((a, b) => b.score - a.score);

    res.json(matches);
});

exports.leftSwipe = asyncHandler(async (req, res) => {
    const currUser = req.user;
    const userId = currUser._id;
    const { targetUserId } = req.body;
    const user = await User.findById(userId);
    user.swipedLeft = [...user.swipedLeft, targetUserId];
    user.save();
    res.send("Success")
})

exports.rightSwipe = asyncHandler(async (req, res) => {
    const currUser = req.user;
    const userId = currUser._id;
    const { targetUserId } = req.body;
    console.log(userId, targetUserId);
    const user = await User.findById(userId).select("-password");
    const targetUser = await User.findById(targetUserId).select("-password");
    console.log(targetUser)
    user.swipedRight = [...user.swipedRight, targetUserId];
    if (targetUser.swipedRight.includes(userId) && user.swipedRight.includes(targetUserId)) {
        user.matched = [...user.matched, targetUserId]
        targetUser.matched = [...targetUser.matched, userId]
    }
    targetUser.save();
    user.save();
    res.send("Success")
})


exports.getallMatches = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const user = await User.findById(userId).populate({
        path: 'matched',
        populate: {
          path: 'preference',
          select: 'photoes'
        }
      });
    res.json(user.matched)
})

exports.getallUsers = asyncHandler(async (req, res) => {
    const allUsers = await User.find();
    res.json(allUsers)
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
}