const express = require('express');
const router = express.Router()
const pool = require('../services/connection')
const gifCtrl = require('../controllers/gifs')



router.post("/", gifCtrl.postGif)
router.delete("/:gifId", gifCtrl.deleteGif)
router.post("/:gifId/comment", gifCtrl.postOneComment);
router.get("/:gifId", gifCtrl.getGif);
  

module.exports = router
  