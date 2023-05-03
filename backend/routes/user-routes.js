const express = require('express');
const router = express.Router();
const multer = require('multer');
const {createAccount, verifyAccount, getAccount, getMe} = require('../controller/user-controller')

const upload = multer();

router.post('/create', upload.single('avatar') ,createAccount)
router.get('/verify', verifyAccount)
router.get('/user', getAccount)
router.get('/me', getMe)
// router.get('/matches', matches)

module.exports = router
