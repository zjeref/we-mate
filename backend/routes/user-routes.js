const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createAccount, verifyAccount, getAccount, getMe , getUserMatches, getallUsers, leftSwipe, rightSwipe, getallMatches } = require('../controller/user-controller')
const { protect } = require('../middlewares/protect')

const upload = multer();

router.post('/create',  createAccount)
router.post('/verify', verifyAccount)
router.get('/detail',protect, getAccount)
router.get('/me', protect, getMe)
router.get('/matches', protect, getUserMatches)
router.put('/leftswipe', protect, leftSwipe)
router.put('/rightswipe', protect, rightSwipe)
router.get('/allmatches', protect, getallMatches)
router.get('/all', getallUsers)

module.exports = router
