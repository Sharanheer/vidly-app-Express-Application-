
const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    phone: String,
    isGold: Boolean
});

const Customer = mongoose.model('Customer', customerSchema);

function validation(customer){
    const schema = {
        name: Joi.string().min(4).max(50).required(),
        phone: Joi.number().min(10).required(),
        isGold: Joi.boolean().required()
    }
    const result = Joi.validate(customer, schema);
    if(result.error){
        return result.error;
    }
        
 }

 module.exports.customerSchema = customerSchema;
 module.exports.CustomerModel = Customer;
 module.exports.validate = validation;