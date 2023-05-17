const Message = require('../model/Message');
const Chat = require('../model/Chat');
const asyncHandler = require('express-async-handler');


exports.createChat = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { targetUserId } = req.body;

    const participants = [userId, targetUserId]
    let chat = await Chat.findOne({ participants: { $all: participants } }).populate('messages');
    if (!chat) {
        chat = new Chat({
            participants: participants
        })

        await chat.save();
    }
    res.json(chat)
})

exports.createMessage = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { sender, receiver, content } = req.body;
    const participants = [userId, receiver];
    let chat = await Chat.findOne({ participants: { $all: participants } }).populate("messages");
    const message = new Message({
        sender: sender,
        receiver: receiver,
        content: content
    });
    await message.save();
    chat.messages = [...chat.messages, message]
    await chat.save();
    res.json(chat)
})


exports.fetchChat = asyncHandler(async (req, res) => {
    const chatId = req.params.chatId;
    const chat = Chat.findById(chatId);
    res.json(chat);
})