
const config = require('config');
const winston = require('winston');

module.exports = function(){
    if(!config.get('jwtPrivateKey')){
        winston.error('Environment variable <jwtPrivateKey> is not set');   
    }
}