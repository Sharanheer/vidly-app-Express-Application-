const winston = require('winston');

module.exports = function (err, req, res, next){

     winston.error(err.message, err);
    //winston.log('error', err.message);
    res.send('Some Internal Error');
}