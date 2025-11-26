const jwt = require('jsonwebtoken')

const isLoggedIn = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        res.locals.isLoggedIn = false;
        res.locals.userId = null;
        next()
    } else {
        res.locals.isLoggedIn = true;
        res.locals.userId = jwt.verify(token, 'danny blog secret').id;
        next()
    }
}

module.exports = isLoggedIn