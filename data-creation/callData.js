const utils = require('../utils')

const CallType = Object.freeze({
    MockOut: Symbol("mockOut"),
    MockIn: Symbol("mockIn"),
    EnrichedIn: Symbol("enrichIn"),
    EnrichedOut: Symbol("enrichedOut")
})


function create(CallType, data, recordingExt = 'wav') {
    console.log('Running')
    return data;
}



let data = create(CallType.MockIn, { "Name": "AShley" });
console.log(data)