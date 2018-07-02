const {MovieModel} = require('../models/movie');
const {CustomerModel} = require('../models/customer');
const {RentalModel, validate} = require('../models/rental');
const express = require('express');
const route = express.Router();
const mongoose = require('mongoose');

const Fawn = require('fawn');
Fawn.init(mongoose);

const Movie = MovieModel;
const Customer = CustomerModel;
const Rental = RentalModel;

route.get('/', async (req, res) => {

    const rental = await Rental.find();
    res.send(rental);
    res.end();

 });


//Delete
//  route.delete('/:id', async (req, res) => {

//     const rental = await Rental.findByIdAndRemove({ _id : req.params.id});
//     if(!rental) return res.status(404).send('Not found');
//     res.send(rental);
//     res.end();
//  });

//Post
 route.post('/', async (req, res) => {
    
    if(result = validate(req.body)) return res.send(result.details[0].message);
    
    // const mov = await Movie.find({title: req.body.title});
    // if(mov.length>0) return res.send('Customer Already Exist In Our Records');

    const mov = await Movie.findById(req.body.movie);
    if(mov.length===0) return res.status(400).send('No such movie exist in our records');

    const cus = await Customer.findById(req.body.customer);
    if(cus.length===0) return res.status(400).send('No such customer exist in our records');

    if(mov.numberInStock === 0) return res.status(400).send('Movie is out of stock');

    let rental = new Rental({
        customer: cus,
        movie: mov,
    });
    
    //Without using transactions
    // const rents = await rental.save();
    // await Movie.findByIdAndUpdate({ _id: req.body.movie}, { $inc: { numberInStock : -1}});

    //With Transactions
    try{
        new Fawn.Task()
        .save('rentals', rental)
        .update('movies', { _id: mov._id}, { $inc : { numberInStock : -1}})
        .run();

        res.send(rental);
        res.end();
    }
    catch(exception){
        res.status(500).send(exception);
    }
   
 });

//Put 
//  route.put('/:id', async (req, res) => {
    
//     if(result = validate(req.body)) return res.send(result.details[0].message);

//     const ren = await Rental.find({ _id : req.params.id})
//     if(ren.length === 0) return res.send('Wrong ID Entered'); 
    
//     // const gen = await Genre.findById(req.body.genre);
//     // if(gen.length===0) return res.send('No such genre exist in our records');

//     const mov = await Movie.findById(req.body.movie);
//     if(mov.length===0) return res.send('No such movie exist in our records');

//     const newRental = await Rental.findByIdAndUpdate( 
//         { _id : req.params.id } , 
//         {
//             movie: mov,
//         }, 
//         { new: true } );

//     res.send(newRental);
//     res.end();
//  });

 module.exports = route;
