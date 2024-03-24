const mongoose = require('mongoose');
const Schema = mongoose.Schema;

import bcrypt from "bcryptjs";

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


GenericDataSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});


GenericDataSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


const Generic = mongoose.model('GenericDataSet', GenericDataSchema);

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