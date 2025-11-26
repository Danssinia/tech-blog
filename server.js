//importing the express module
const express = require('express');
//creating an express application
const app = express();
//importing the isLoggedIn middleware
const isLoggedIn = require('./middleware/isLogged')

//port number
require('dotenv').config()
const port = process.env.PORT || 3000;
//importing the cookie-parser
const cookieParser = require('cookie-parser')
app.use(cookieParser())
//checking the isLoggedIn middlware
app.use(isLoggedIn)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//setting uo the database DB
const mongoose = require('mongoose')
const dbURI = process.env.MONGODB_URI
mongoose.connect(dbURI)
    .then((result) => {
        app.listen(port, () => {
            console.log('Connected Successfully')
            console.log(`listening from port ${port}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })
//importing the Routes
const blogRoutes = require('./routes/blogRoutes')
const userRoutes = require('./routes/userRoutes')


//setting view engine
app.set('view engine', 'pug');

//setting up the static files
app.use(express.static('public'))
//setting the views
app.set('views', './views')
//using the blogRoutes for any route starting with /blogs
app.use('/', blogRoutes);
app.use(userRoutes)

//getting all blogs
app.use((req, res) => {
    res.send("404")
})

