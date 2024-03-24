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

// need:
// acount none infinty fro user/pass

// authtype pass / federated
// mfa enabled =1/ user - requires mfa/ account

// set up device/choose device = text message
// input code


// Going to need to be api tests for most of the test
// Potential for manual hub test for full e2e

// account mfa can't be disabled by user level/ 