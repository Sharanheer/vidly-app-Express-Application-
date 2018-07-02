
const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: String
});

const Genre = mongoose.model('Genre', genreSchema);

function validation(genre){
    const schema = {
        name: Joi.string().min(4).max(50).required()
    }
    const result = Joi.validate(genre, schema);
    if(result.error){
        return result.error;
    }
        
 }

 module.exports.genreSchema = genreSchema;
 module.exports.GenreModel = Genre;
 module.exports.validate = validation;