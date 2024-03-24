import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'


//Set up express app
const app = express();

//connect to MongoDB
mongoose.connect('mongodb://localhost/Test-Data-Service');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//init routes
import genericRoutes from './routes/genericData'
app.use('/api/generic/v1', genericRoutes);


//Error Handling
app.use(function (err, req, res, next) {
    res.status(422).send({
        Error: err.message
    });
});

//Listen for requests
app.listen(9000 || process.env.port, function () {
    console.log('Start Up Complete\nNow listening for requests...');
});


//TODO: Create routes for creating data snippets
//TODO: potentially look into creating custom datagen?

