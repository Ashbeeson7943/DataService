import mongoose from 'mongoose'

const localDB = `mongodb://localhost/Test-Data-Service`


//connect to MongoDB
const connctDB = async () => {
    await mongoose.connect(localDB, {});
    mongoose.Promise = global.Promise;
    console.log("MongoDB Connected")
}

export default connctDB