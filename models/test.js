const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Test Schema and model
const TestSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Please enter a name']
    },
    fieldOne: {
        type: String
    },
    fieldTwo: {
        type: Number
    }


});

const Test = mongoose.model('test', TestSchema);

module.exports = Test;