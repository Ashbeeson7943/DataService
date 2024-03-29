import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import basicAuth from 'express-basic-auth'
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
app.use(express.static('./src/public'))
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(basicAuth({
    users: { 'admin': 'admin' }
}))


//init routes
import genericRoutes from '../routes/genericData.js'
app.use('/api/generic/v1', genericRoutes);




//Error Handling
app.use(function (err, req, res, next) {
    res.status(422).send({
        Error: err.message
    });
});

//Listen for requests
app.listen(PORT || process.env.port, function () {
    console.log(`Now listening for requests on port ${PORT}`);
});

// TODO: Create routes for creating data snippets
// TODO: potentially look into creating custom datagen?
// TODO: Define auth.config.json
// TODO: Implement auth.config.json
// TODO: Update ReadME
// TODO: Create Docs
// TODO: Set up workflows
// TODO: Write tests
// TODO: Set up dev env
// TODO: Add UI
// TODO: Use Tracking tool (jira/etc..)
// TODO: Set up reporting bugs
// TODO: Set up feature Requests
// TODO: Branding (FallenArms)
// TODO: Set up Social Media
// TODO: Update Discord Server