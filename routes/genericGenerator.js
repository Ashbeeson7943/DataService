import express from 'express'
const router = express.Router();
import { generateRandomCustomer, generateRandomPhoneNumber, generateRandomCreditCard } from '../data_creation/data_creation.js';

//GET
router.get('/get/generator/:dataType', function (req, res, next) {
    const dataType = req.params.dataType.toLowerCase()
    switch (dataType) {
        case 'customer':
            res.status(200).send(getReturnMessage(dataType, generateRandomCustomer()))
            break
        case 'number':
            res.status(200).send(getReturnMessage(dataType, generateRandomPhoneNumber('UK', true)))
            break;
        case 'creditcard':
            res.status(200).send(getReturnMessage(dataType, generateRandomCreditCard()))
        default:
            res.status(400).send({ message: `No valid data generation type selected: Sent data type -> ${dataType}` })
    }

});


export default router;

function getReturnMessage(dataType, genData) {
    return {
        message: `Returning data based on type ${dataType}`,
        data: genData
    }
} 