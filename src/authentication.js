import envConfig from '../config/env.json' with { type: "json" }
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'



export async function getToken(password, user, username) {
    return await bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
            const maxAge = 3 * 60 * 60
            const token = jwt.sign(
                { id: user._id, username, role: user.role },
                envConfig.jwtSecret,
                {
                    expiresIn: maxAge, // 3hrs in sec
                }
            )
            return { status: true, message: token }
        } else {
            return { status: false, message: "Login not succesful" }
        }
    })
}

export function authenticateUserRole(req, role) {
    const token = req.cookie.jwt
    if (token) {
        jwt.verify(token, envConfig.jwtSecret, (err, decodedToken) => {
            if (err) {
                return { status: 401, message: "Not Authorised" }
            } else {
                if (decodedToken.role !== role) {
                    return { status: 401, message: "Not Authorised" }
                } else {
                    return { status: 202, message: "Authorised" }
                }
            }
        })
    }
}