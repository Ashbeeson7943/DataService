import express from 'express'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as auth from '../src/authentication.js'
import envConfig from '../config/env.json' with { type: "json" }

const router = express.Router()

router.post('/register', async function (req, res, next) {
    const { username, password, email } = req.body
    if (password.length < 6) {
        return res.status(400).send({ message: "Password less than 6 characters" })
    }
    try {
        bcrypt.hash(password, 10).then(async (hash) => {
            await User.create({
                username: username,
                password: hash,
                email: email
            }).then(async function (user) {
                const maxAge = 3 * 60 * 60
                const creds = await auth.getToken(password, user, username)
                console.log(creds)
                if (creds.status) {
                    res.status(200).cookie("jwt", creds.message, {
                        httpOnly: true,
                        maxAge: maxAge * 1000, // 3hrs in ms
                    }).send({
                        message: "User successfully created",
                        username: username,
                    })
                } else {
                    res.status(400).send({ message: creds.message })
                }
            })
        })
    } catch (err) {
        res.status(401).send({
            error: err.mesage,
            message: `User not successful created. Is this a duplicate user?`
        })
        console.log(err)
    }
});

router.post('/login', async function (req, res, next) {
    const { username, password } = req.body
    try {

        if (!username || !password) {
            res.status(400).send({
                message: "Username or Password not present",
            })
        }
        await User.findOne({ username }).then(async (user) => {
            if (!user) {
                res.status(401).send({
                    message: "Login not successful",
                    error: "User not found",
                })
            } else {
                const maxAge = 3 * 60 * 60
                await auth.getToken(password, user, username).then((creds) => {
                    if (creds.status) {
                        res.status(200).cookie("jwt", creds.message, {
                            httpOnly: true,
                            maxAge: maxAge * 1000, // 3hrs in ms
                        }).send({ message: "Authorised" })
                    } else {
                        res.status(400).send({ message: creds.message })
                    }
                })
            }
        })
    } catch (error) {
        res.status(400).send({
            message: "An error occurred",
            error: error.message,
        })
    }
})


export default router
