const { customerSchema } = require('./customer');
const { movieSchema } = require('./movie');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    
    customer: {
        type: customerSchema,
        required: true
    },
    movie: {
        type: movieSchema,
        required: true
    },
    dayReturned: {
        type: Date,
    },
    dateIssued: {
        type: Date,
        default: Date.now,
        required: true
    },
    rentalFee: {
        type: Number
    }
});

const Rental = mongoose.model('Rental', rentalSchema);

function validation(rental){
    const schema = {
        customer: Joi.objectId().required(),
        movie: Joi.objectId().required(),
    }
    const result = Joi.validate(rental, schema);
    if(result.error){
        return result.error;
    }    
 }

 module.exports.rentalSchema = rentalSchema;
 module.exports.RentalModel = Rental;
 module.exports.validate = validation;


