const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//Set up express app
const app = express();

//connect to MongoDB
mongoose.connect('mongodb://localhost/Test-Data-Service');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//init routes
app.use('/api/generic/v1', require('./routes/genericData'));


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


//TODO: Create routes for generic data
//TODO: Create routes for creating data snippets
//TODO: potentially look into creating custom datagen?

