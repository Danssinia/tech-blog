//importing express
const express = require('express')
//importing the router
const router = express.Router();
//importing the user controller
const { logInPage, signUpPage, logIn, signup, logOut } = require('../controllers/userController');

router.get('/login', logInPage)
router.get('/signup', signUpPage)
router.post('/login', logIn)
router.post('/signup', signup)
router.get('/logout', logOut)

module.exports = router;