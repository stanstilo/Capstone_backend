const express = require('express');
const router = express.Router()
const pool = require('../services/connection')
const feedCtrl = require('../controllers/feed')

  router.get("/", feedCtrl.getFeed);
  
  module.exports = router