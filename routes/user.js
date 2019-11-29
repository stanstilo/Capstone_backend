const express = require('express');
const router = express.Router()
const pool = require('../services/connection')

const registerCtrl = require('../controllers/user')
const signinCtrl = require('../controllers/user')


router.post("/create-user", registerCtrl.createThing);
router.post("/signin", signinCtrl.postSignin);




  
  module.exports = router