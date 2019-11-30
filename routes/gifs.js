const express = require('express');

const router = express.Router();

const gifCtrl = require('../controllers/gifs');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');


router.post('/', gifCtrl.postGif);
router.delete('/:gifId', gifCtrl.deleteGif);
router.post('/:gifId/comment', auth, multer, gifCtrl.postOneComment);
router.get('/:gifI', gifCtrl.getGif);

module.exports = router;
