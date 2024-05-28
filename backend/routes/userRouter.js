const express = require('express');
const {getLogin,login,getSignUp,signUp} = require('../controllers/userController');

const router = express.Router();

router.route('/login').get(getLogin).post(login);
router.route('/signup').get(getSignUp).post(signUp);

module.exports = router;