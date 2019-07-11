const config = require('config');
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(config.get('db'), { 
        useNewUrlParser: true,
        useCreateIndex: false,
        useFindAndModify: false
    });

    mongoose.connection.on('connected', () => {
        console.log(`Successfully connected to ${config.get('db')}`)
    });
}