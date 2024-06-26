import express from 'express'
const router = express.Router();
import UserModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import { authCheck } from '../src/auth.js';
import { getMessage } from '../src/responseMessages.js';

const saltRounds = 10;

router.post('/user/register', function (req, res, next) {
    if (authCheck(req.cookies)) {
        var newData = req.body;
        console.log(newData)
        //Hash Password
        bcrypt.hash(newData.password, saltRounds, function (err, hash) {
            newData.password = hash
            UserModel.create(newData).then(function (dataObject) {
                res.status(201).send({
                    username: newData.username,
                    email: newData.email
                });
            }).catch(next);
        })
    } else {
        res.status(401).send(getMessage('not authorised'))
    }
});


router.get('/user/login', async function (req, res, next) {
    let userDetails = {
        username: req.query.uname,
        password: req.query.pwd
    }
    const dbUser = await UserModel.findOne({ username: userDetails.username }, { _id: 0 })
    if (dbUser != null) {
        const matchedPassword = bcrypt.compare(userDetails.password, dbUser.password)
        if (matchedPassword) {
            res.status(200).cookie("authToken", "valid", { maxAge: 90000, secure: true }).send()
        } else {
            res.status(401).send(getMessage('details incorrect'))
        }
    } else {
        res.status(401).send(getMessage('details incorrect'))
    }
})


router.get('/user/validateToken', function (req, res, next) {
    if (authCheck(req.cookies)) {
        res.status(200).send()
    } else {
        res.status(401).send()
    }
})

router.get('/user/logout', function (req, res, next) {
    res.status(201).clearCookie('authToken').send()
})

export default router