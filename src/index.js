import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import connctDB from './dbConnection.js';

const PORT = 9000




//Set up express app
const app = express();
app.use(bodyParser.json());
app.use(cookieParser)
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

//Init DB
connctDB()

//Listen for requests
app.listen(PORT || process.env.port, function () {
    console.log(`Now listening for requests on port ${PORT}`);
});



//TODO: Create routes for creating data snippets
//TODO: potentially look into creating custom datagen?

