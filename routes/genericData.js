const express = require('express');
const router = express.Router();
const GenericData = require('../models/data');
const { v4: uuidv4 } = require('uuid');


//GET ALL BY Scenario ID
router.get('/get/scenario/:scenarioId', function (req, res, next) {
    GenericData.find({ scenarioId: req.params.scenarioId }, { _id: 0 }).then(function (dataObject) {
        res.status(200).send(dataObject);
    }).catch(next);

});

//GET ONE by Data ID
router.get('/get/data/:dataId', function (req, res, next) {
    GenericData.find({ dataId: req.params.dataId }).then(function (dataObject) {
        res.status(200).send(dataObject);
    }).catch(next);

});

//CREATE DAta
router.post('/save/data', function (req, res, next) {
    var newData = req.body;
    if (newData.scenarioId == '' || newData.scenarioId == undefined) {
        newData["scenarioId"] = uuidv4();
    }
    newData["dataId"] = uuidv4();
    newData["createdDate"] = new Date().toISOString();
    GenericData.create(newData).then(function (dataObject) {
        res.status(201).send({
            "dataId": dataObject.dataId,
            "scenarioId": dataObject.scenarioId,
            "dataDescription": dataObject.dataDescription
        });
    }).catch(next);
});

// //UPDATE
// router.put('/update/:id', function (req, res, next) {
//     GenericData.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
//         GenericData.findOne({ _id: req.params.id }).then(function (dataObject) {
//             res.status(202).send(dataObject);
//         });
//     }).catch(next);
// });


//DELETE DATA
router.delete('/delete/data/:dataId', function (req, res, next) {
    GenericData.findOneAndDelete({ dataId: req.params.dataId }).then(function (dataObject) {
        res.status(200).send(`Deleted Entry:\n${dataObject}`);
    }).catch(next);
});

//TODO: DEbug and Fix?
//Delete Scenario
router.delete('delete/scenario/:scenarioId', function (req, res, next) {
    GenericData.findOneAndDelete({ scenarioId: req.params.scenarioId }).then(function (dataObject) {
        res.status(200).send(`Deleted Scenario: ${dataObject.scenarioId}`);
    }).catch(next);

});


module.exports = router;