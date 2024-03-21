const express = require('express');
const router = express.Router();
const GenericData = require('../models/data');
const { v4: uuidv4 } = require('uuid');


//GET ALL
router.get('/get', function (req, res, next) {
    GenericData.find({}).then(function (dataObject) {
        res.status(200).send(dataObject);
    }).catch(next);

});

//GET ONE
router.get('/get/:id', function (req, res, next) {
    GenericData.find({ _id: req.params.id }).then(function (dataObject) {
        res.status(200).send(dataObject);
    }).catch(next);

});

//CREATE
router.post('/save', function (req, res, next) {
    var newData = req.body
    newData["dataId"] = uuidv4()
    newData["scenarioId"] = uuidv4()
    GenericData.create(newData).then(function (dataObject) {
        res.status(201).send(dataObject)
    }).catch(next);
});

//UPDATE
router.put('/update/:id', function (req, res, next) {
    GenericData.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
        GenericData.findOne({ _id: req.params.id }).then(function (dataObject) {
            res.status(202).send(dataObject);
        });
    }).catch(next);
});


//DELETE
router.delete('/delete/:id', function (req, res, next) {
    GenericData.findByIdAndDelete({ _id: req.params.id }).then(function (dataObject) {
        res.status(200).send(`Deleted Entry:\n\n${dataObject}`);
    }).catch(next);
});

module.exports = router;