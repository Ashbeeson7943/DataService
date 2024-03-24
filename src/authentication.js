import envConfig from '../config/env.json' with { type: "json" }
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'



const getToken = (username, password, user) => {
    // bcrypt.compare(password, user.password).then(function (result) {
    //     if (result) {
    //         const maxAge = 3 * 60 * 60; // 3 hours
    //         const token = jwt.sign(
    //             { id: user._id, username, role: user.role },
    //             envConfig.jwtSecret,
    //             {
    //                 expiresIn: maxAge, // 3hrs in sec
    //             }
    //         );
    //         return {
    //             "jwt": "jwt", "token": token, "values": {
    //                 httpOnly: true,
    //                 maxAge: maxAge * 1000, // 3hrs in ms
    //             }
    //         };
    //     } else {
    //         return { message: "Login not succesful" };
    //     }
    // })
}

const authenticateToken = (token, expectedRole) => {

}


export { getToken, authenticateToken }