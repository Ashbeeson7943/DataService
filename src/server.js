import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import basicAuth from 'express-basic-auth'
import cookieParser from 'cookie-parser'
// import UserModel from '../models/userModel.js'

const localDB = `mongodb://localhost/Test-Data-Service`
const PORT = 9000

//Init DB
mongoose.connect(localDB);
mongoose.Promise = global.Promise;
// let credentials = await UserModel.find({}).then(function (users) {
//     let details = []
//     users.forEach(user => {
//         details.push(`\'${user.username}\':\'${user.password}\'`)
//     });
//     return details
// })
// console.log(credentials)

//Set up express app
const app = express();
app.use(cookieParser())
app.use(express.static('./src/website'))
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
// app.use(basicAuth({
//     users: { 'admin': 'admin' }
// }))

//init routes
import genericRoutes from '../routes/genericData.js'
import genericGeneratorRoutes from '../routes/genericGenerator.js'
import userRoutes from '../routes/user.js'

const apiPath = '/api/generic/v1'
app.use(apiPath, genericRoutes);
app.use(apiPath, genericGeneratorRoutes);
app.use(apiPath, userRoutes);

//Listen for requests
app.listen(PORT || process.env.port, function () {
    console.log(`Now listening for requests on port ${PORT}`);
});