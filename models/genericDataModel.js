import mongoose from 'mongoose'
const Schema = mongoose.Schema;


//Create Test Schema and model
const GenericDataSchema = new Schema({

    dataDescription: {
        type: String,
        required: [true, 'Please enter a description for this data']
    },
    dataId: {
        type: String
    },
    scenarioId: {
        type: String
    },
    customData: {
        type: Object,
        required: [true, 'No data found to save']
    },
    createdDate: {
        type: String
    }

}, { strict: false, versionKey: false });

const Generic = mongoose.model('GenericData', GenericDataSchema);

export default Generic;

