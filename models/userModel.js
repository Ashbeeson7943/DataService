import mongoose from 'mongoose'
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Please enter a username'],
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Basic",
        required: true,
    },
    organisation: {
        type: String,
        required: true
    }
})

const User = mongoose.model("user", UserSchema)
export default User

//  TODO: Define User