const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createAccount, verifyAccount, getAccount, getMe } = require('../controller/user-controller')
const { protect } = require('../middlewares/protect')

const upload = multer();

router.post('/create', upload.single('avatar'), createAccount)
router.post('/verify', verifyAccount)
router.get('/detail/:id', getAccount)
router.get('/me', protect, getMe)
// router.get('/matches', matches)

module.exports = router
