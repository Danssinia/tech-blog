//logInPage,signUpPage, logIn, signUp, logOut
const User = require('../models/auth')
const bcrypt = require('bcrypt')
//importing jwt
const jwt = require('jsonwebtoken')
const maxAge = 3 * 24 * 60 * 60;

//function to create token
const createToken = (id) => {
    return jwt.sign({ id }, 'danny blog secret', {
        expiresIn: maxAge * 1000
    })
}

const logInPage = (req, res) => {
    res.render('users/login')
}

const signUpPage = (req, res) => {
    res.render('users/signup')
}

const logIn = async (req, res) => {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();
    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ msg: "User not found" })
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            res.status(400).json({ msg: "Incorrect Password" })
        } else {
            const token = createToken(user._id)
            // res.locals.userId = user._id;
            //console.log(res.locals.userId)
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: maxAge * 1000
            })
            res.redirect('/')
            console.log("User logged in successfully");
        }

    } catch (error) {
        console.log(error.message)
    }
}

const signup = async (req, res) => {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt()
    const hashed = await bcrypt.hash(password, salt)
    try {
        const user = new User({
            email: email,
            password: hashed
        })
        const result = await user.save()
        const token = createToken(result._id)
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge
        })
        console.log(result)
        res.status(201).redirect('/login')
    } catch (error) {
        const err = error.message;
        console.log(err)
        res.status(500).send(err)
    }
}

const logOut = (req, res) => {
    res.cookie('jwt', '', {
        maxAge: 1
    })
    res.redirect('/')
    console.log("User logged out successfully");
}

module.exports = {
    logInPage,
    signUpPage,
    logIn,
    signup,
    logOut
}