import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const localDB = `mongodb://localhost/Test-Data-Service`
const PORT = 9000

//Init DB
mongoose.connect(localDB);
mongoose.Promise = global.Promise;


//Set up express app
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


//init routes
import genericRoutes from '../routes/genericData.js'
import authRoutes from '../routes/auth.js'
app.use('/api/generic/v1', genericRoutes);
app.use('/api/auth/v1', authRoutes);



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

