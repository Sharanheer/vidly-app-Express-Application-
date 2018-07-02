const {MovieModel, validate} = require('../models/movie');
const {GenreModel} = require('../models/genre');
const express = require('express');
const route = express.Router();

const mongoose = require('mongoose');

const Movie = MovieModel;
const Genre = GenreModel;

//For dev purpose only
// mongoose.connect('mongodb://localhost/Vidly')
//     .then( () => console.log('Connected to the database'))
//     .catch( err => console.log('Something went wrong', err.message));


// const Genre = mongoose.model('Genre', genre.genreSchema);
//Create an entry
// async function createMovie(){
//     const movie = new Movie({
//         title: 'Bombay Rockers',
//         genre: new Genre({name: 'Action Ext'}),
//         numberInStock: 20,
//         dailyRentalRate: 1
//     });

//     const result = await movie.save();
//     console.log(result);
// }

// createMovie();



//Get
route.get('/', async (req, res) => {

    const movie = await Movie.find();
    res.send(movie);
    res.end();

 });


//Delete
 route.delete('/:id', async (req, res) => {

    const movie = await Movie.findByIdAndRemove({ _id : req.params.id});
    if(!movie) return res.status(404).send('Not found');
    res.send(movie);
    res.end();
 });

//Post
 route.post('/', async (req, res) => {
    
    if(result = validate(req.body)) return res.send(result.details[0].message);
    
    const mov = await Movie.find({title: req.body.title});
    if(mov.length>0) return res.send('Customer Already Exist In Our Records');

    const gen = await Genre.findById(req.body.genre);
    if(gen.length===0) return res.send('No such genre exist in our records');

    let movie = new Movie({
        title: req.body.title,
        genre: gen,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    res.send(await movie.save());
    res.end();
 });

//Put 
 route.put('/:id', async (req, res) => {
    
    if(result = validate(req.body)) return res.send(result.details[0].message);

    const mov = await Movie.find({ _id : req.params.id})
    if(mov.length === 0) return res.send('Wrong ID Entered'); 
    
    const gen = await Genre.findById(req.body.genre);
    if(gen.length===0) return res.send('No such genre exist in our records');

    const newMovie = await Movie.findByIdAndUpdate( 
        { _id : req.params.id } , 
        {
            title: req.body.title, 
            genre: gen,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }, 
        { new: true } );

    res.send(newMovie);
    res.end();
 });

 module.exports = route;