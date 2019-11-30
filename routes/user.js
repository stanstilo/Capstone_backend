const express = require('express');

const router = express.Router();


const registerCtrl = require('../controllers/user');
const signinCtrl = require('../controllers/user_2');


router.post('/create-user', registerCtrl.createThing);
router.post('/signin', signinCtrl.postSignin);

module.exports = router;
