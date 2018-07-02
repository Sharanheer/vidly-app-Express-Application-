
const { customerSchema, validate} = require('../models/customer');
const express = require('express');
const route = express.Router();

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer', customerSchema);

//Get
route.get('/', async (req, res) => {

    res.send(await Customer.find());
    res.end();

 });

 //Delete
 route.delete('/:id', async (req, res) => {

    const customer = await Customer.findByIdAndRemove({ _id : req.params.id});
    if(!customer) return res.status(404).send('Not found');
    res.send(customer);
    res.end();
 });

 //Post
 route.post('/', async (req, res) => {
    
    if(result = validate(req.body)) return res.send(result.details[0].message);
    
    const cus = await Customer.find({name: req.body.name , phone: req.body.phone, isGold: req.body.isGold});
    if(cus.length>0) return res.send('Customer Already Exist In Our Records');

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    res.send(await customer.save());
    res.end();
 });

 //Put 
 route.put('/:id', async (req, res) => {
    
    if(result = validate(req.body)) return res.send(result.details[0].message);

    const cus = await Customer.find({ _id : req.params.id})
    if(cus.length === 0) return res.send('Wrong ID Entered');    

    const newCustomer = await Customer.findByIdAndUpdate( 
        {_id : req.params.id} , {name: req.body.name, phone: req.body.phone, isGold: req.body.isGold}, 
        {new: true} );

    res.send(newCustomer);
    res.end();
 });

 module.exports = route;
