const User = require('../model/User');
const asyncHandler = require('express-async-handler');
const axios = require('axios')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createAccount = asyncHandler(async (req, res) => {
    const { name, email, password, age, gender } = req.body;
    const avatar = req.file;

    let imageUrl;

    const existingUser = await User.findOne({ email: email })
    if (existingUser) {
        return res.status(409).json({ error: 'Already exist' })
    }

    const body = {
        image: avatar.buffer.toString('base64'), // Convert the file buffer to a base64-encoded string
        type: 'base64'
    };

    const headers = {
        Authorization: `Client-ID ${process.env.IMGUR_ID}`,
    };

    try {
        const res = await axios.post('https://api.imgur.com/3/image', body, { headers });
        imageUrl = res.data.data.link
    } catch (error) {
        return res.status(501).json({ message: 'File Upload Error' });
    }
    const encry_password = bcrypt.hashSync(password);
    const newUser = new User({
        name: name,
        email: email,
        password: encry_password,
        age:age,
        gender: gender,
        avatar: imageUrl
    })
    await newUser.save();

    res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        token: generateToken(newUser._id)
    })
})

exports.verifyAccount = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email })

    if (!existingUser) {
        return res.status(404).json({ message: "Account doesn't exist" })
    }

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
    const id = req.params.id;
    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ message: "User does not exist" })

    res.status(200).json(user);
})

exports.getMe = asyncHandler(async (req, res) => {
    res.send(req.user);
})

// preferences: {
//     college: String,
//     hobbies: [String],
//     drinks: [String],
//     favShows: [{
//       name: String,
//       genre: String,
//     }],
//     favSongs: [{
//       name: String,
//       genre: String,
//     }],
//     departments: [String],
//   },

async function findMatches(user) {
    const potentialMatches = await User.find({
        // Query the database for users whose preferences match at least one of the current user's preferences
        $or: [
            { "preferences.college": user.preferences.college },
            { "preferences.hobbies": { $in: user.preferences.hobbies } },
            { "preferences.drinks": { $in: user.preferences.drinks } },
            { "preferences.favShows.genre": { $in: user.preferences.favShows.map(show => show.genre) } },
            { "preferences.favSongs.genre": { $in: user.preferences.favSongs.map(song => song.genre) } },
            { "preferences.departments": { $in: user.preferences.departments } },
        ],
    });

    // Calculate the match score for each potential match
    const matchesWithScore = potentialMatches.map(match => ({
        user: match,
        score: (
            (match.preferences.college === user.preferences.college) +
            match.preferences.hobbies.filter(hobby => user.preferences.hobbies.includes(hobby)).length +
            match.preferences.drinks.filter(drink => user.preferences.drinks.includes(drink)).length +
            match.preferences.favShows.filter(show => user.preferences.favShows.some(userShow => userShow.genre === show.genre)).length +
            match.preferences.favSongs.filter(song => user.preferences.favSongs.some(userSong => userSong.genre === song.genre)).length +
            match.preferences.departments.filter(department => user.preferences.departments.includes(department)).length
        ),
    }));

    // Sort the matches by their match score in descending order
    const sortedMatches = matchesWithScore.sort((match1, match2) => match2.score - match1.score);

    return sortedMatches;
}

// app.get('/users/:userId/matches', async (req, res) => {
//     const user = await User.findById(req.params.userId);

//     const matches = await findMatches(user);

//     res.json(matches);
// });




const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
}