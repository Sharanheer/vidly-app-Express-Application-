const {genreSchema} = require('./genre');
const Joi = require('joi');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    genre: genreSchema,
    numberInStock: Number,
    dailyRentalRate: Number
});

const Movie = mongoose.model('Movie', movieSchema);

function validation(movie){
    const schema = {
        title: Joi.string().min(0).max(100).required(),
        genre: Joi.string().required(),
        numberInStock: Joi.number().min(0).max(100).required(),
        dailyRentalRate: Joi.number().min(0).max(100).required()
    }
    const result = Joi.validate(movie, schema);
    if(result.error){
        return result.error;
    }
        
 }

module.exports.movieSchema = movieSchema;
module.exports.MovieModel = Movie;
module.exports.validate = validation;