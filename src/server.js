import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'

//Set up express app
const app = express();

//Init DB
mongoose.Promise = global.Promise;
const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
};
console.log('##########')
console.log(process.env.MONGODB_URI)
console.log('##########')
await mongoose.connect(process.env.MONGODB_URI, options)

app.use(cookieParser())
app.use(express.static('./src/website'))
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


//init routes
import genericRoutes from '../routes/genericData.js'
import genericGeneratorRoutes from '../routes/genericGenerator.js'
import userRoutes from '../routes/user.js'

const apiPath = '/api/generic/v1'
app.use(apiPath, genericRoutes);
app.use(apiPath, genericGeneratorRoutes);
app.use(apiPath, userRoutes);

const PORT = process.env.PORT
// const PORT = 9000

//Listen for requests
app.listen(PORT, function () {
    console.log(`Now listening for requests on port ${PORT}`);
});