import express from 'express'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// import Auth from '../src/authentication.js'
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
            })
        }).then(function (user) {
            res.status(200).send({
                message: "User successfully created",
                username: username,
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
        const user = await User.findOne({ username })
        if (!username || !password) {
            res.status(400).send({
                message: "Username or Password not present",
            })
        }
        if (!user) {
            res.status(401).send({
                message: "Login not successful",
                error: "User not found",
            })
        } else {
            bcrypt.compare(password, user.password).then(function (result) {
                if (result) {
                    const maxAge = 3 * 60 * 60; // 3 hours
                    const token = jwt.sign(
                        { id: user._id, username, role: user.role },
                        envConfig.jwtSecret,
                        {
                            expiresIn: maxAge, // 3hrs in sec
                        }
                    );
                    res.cookie("jwt", token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000, // 3hrs in ms
                    });
                    res.status(201).json({
                        message: "User successfully Logged in",
                        user: user.username,
                    });
                } else {
                    res.status(400).json({ message: "Login not succesful" });
                }
            })
        }
    } catch (error) {
        res.status(400).send({
            message: "An error occurred",
            error: error.message,
        })
    }
})


export default router