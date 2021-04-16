const passport = require('passport');
const passportJWT = require('passport-jwt');
require('dotenv').config()

const User = require('../models')

const {SECRET} = process.env;

const {Strategy} = passportJWT

const cookieExtractor = req => {
    let jwt = null 

    if (req && req.cookies) {
        jwt = req.cookies['nToken']
    }

    return jwt
}

const params = {
    secretOrKey: SECRET,
    jwtFromRequest: cookieExtractor,
}

passport.use(
    new Strategy(params, function (payload, done) {
        User.find({ _id: payload.id })
            .then(([user]) => {
                if (!user) {
                    return done(new Error('User not found'))
                }
                return done(null, user)
            })
            .catch((err) => done(err))
    }),
)
