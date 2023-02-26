const jwt = require('jsonwebtoken');
const User = require('../models/user');

const loginRequired = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token , "server secret", (err, decodedToken) => {
            if(err)
            {
                console.log(err.message);
                res.redirect('/login');
            }
            next();
        });
    }
    else{
        res.redirect('/login');
    }
};

const isLogged = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, 'server secret', async(err, decodedToken) => {
            if(err){
                res.locals.user = null;
                next();
            }else{
                const user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })

    }else{
        res.locals.user = null;
        next();
    }
};

module.exports = {loginRequired, isLogged};