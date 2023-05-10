const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect } = require('../middlewares/protect')
const { allEnums, addImages, prefer, addBio, addAbout, addInterests } = require('../controller/preference-controller')


const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10000000 },
}).array('myImage', 4);

router.get('/enums', allEnums);
router.get('/', protect, prefer);
router.put('/images', upload, protect, addImages);
router.put('/bio', protect, addBio);
router.put('/about', protect, addAbout);
router.put('/interests', protect, addInterests);

module.exports = router
