const winston = require('winston');
// require('winston-mongodb');

module.exports = function(){

    winston.add(winston.transports.File, {filename: 'logfile.log'});
    //winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly', level: error});

    // process.on('uncaughtException', (ex) => {
    //     console.log('Uncaught exception handled...!');
    //     winston.error(ex.message, ex);
    // });
    //or
    winston.handleExceptions(
        new winston.transports.Console({ colorize: true, prettyPrint: true}),
        new winston.transports.File({filename: 'UnhandledExceptions.log'})
    );

}
