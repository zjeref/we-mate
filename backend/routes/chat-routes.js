const express = require('express');
const router = express.Router();
const {createChat, createMessage, fetchChat} = require('../controller/chat-controller')
const { protect } = require('../middlewares/protect')

// Get messages between two users
router.post('/create', protect, createChat);
router.get('/:chatId', fetchChat)
router.post('/:chatId', protect, createMessage)

module.exports = router;