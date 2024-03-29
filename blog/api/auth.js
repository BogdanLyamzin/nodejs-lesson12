const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')
require('dotenv').config()

const User = require('../models')

const router = express.Router()

const secret = process.env.SECRET;

const auth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (!user || err) {
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: 'Unauthorized',
                data: 'Unauthorized',
            })
        }
        req.user = user
        next()
    })(req, res, next)
}

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user || !user.validPassword(password)) {
        return res.status(400).json({
            status: 'error',
            code: 400,
            message: 'Incorrect login or password',
            data: 'Bad request',
        })
    }

    const payload = {
        id: user.id,
    }

    const token = jwt.sign(payload, secret, { expiresIn: '1h' })
    res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
    res.json({
        status: 'success',
        code: 200,
        data: {
            token,
        },
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/')
})

router.post('/registration', async (req, res, next) => {
    const { username, email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
        return res.status(409).json({
            status: 'error',
            code: 409,
            message: 'Email is already in use',
            data: 'Conflict',
        })
    }
    try {
        const newUser = new User({ username, email })
        newUser.setPassword(password)
        await newUser.save()
        res.status(201).json({
            status: 'success',
            code: 201,
            data: {
                message: 'Registration successful',
            },
        })
    } catch (error) {
        next(error)
    }
})

router.get('/profile', auth, (req, res, next) => {
    const { username } = req.user
    res.json({
        status: 'success',
        code: 200,
        data: {
            message: `Authorization was successful: ${username}`,
        },
    })
})

module.exports = router
