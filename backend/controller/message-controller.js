const Message = require('../model/Message');
const asyncHandler = require('express-async-handler');

exports.allMessage = asyncHandler(async (req, res) => {
    try {
        const senderId = req.body.senderId;
        const receiverId = req.body.receiverId;


        const messages = await Message.find({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        });
        res.json(messages);


    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
})



exports.createMessage = asyncHandler(async (req, res) => {
    try {
        socket.on("directMessage", async (messageObj) => {
            const message = new Message(messageObj);
            await message.save();
            io.to(messageObj.receiver).emit("directMessage", messageObj);
            res.status(201).json({ message });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
})

