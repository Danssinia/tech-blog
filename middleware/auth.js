const jwt = require('jsonwebtoken')
//creating a function to check whether the user is authenticated or not
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        // res.locals.isLoggedIn = false;
        res.redirect('/login')
    } else {
        try {
            const verified = jwt.verify(token, 'danny blog secret')
            if (verified) {
                res.locals.isLoggedIn = true;
                // res.locals.userId = verified.userId;
                // console.log(verified)
                next()
            } else {
                // res.locals.isLoggedIn = false;
                res.redirect('/login')
            }
        } catch (error) {
            console.log(error.message)
            // res.locals.isLoggedIn = false;
            res.redirect('/login')
        }
    }
}


module.exports = requireAuth