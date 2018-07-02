const route = require('../routes/genres.js');
const customerRoute = require('../routes/customers');
const movieRoute = require('../routes/movies');
const rentalRoute = require('../routes/rentals');
const userRoute = require('../routes/users');
const authRoute = require('../routes/auth');
const error = require('../middleware/error');
// require('express-async-errors');
const express = require('express');

module.exports = function(app){

    app.use(express.json());
    app.use('/api/genres', route);
    app.use('/api/customers', customerRoute);
    app.use('/api/movies', movieRoute);
    app.use('/api/rentals', rentalRoute);
    app.use('/api/users', userRoute);
    app.use('/api/auth', authRoute);
    app.use(error);

}