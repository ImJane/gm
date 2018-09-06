const mongoose = require('mongoose');
const config = require('./config');
module.exports = ()=>{
    mongoose.connect(config.mongodb);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connect fail:'));
    db.once('open', (callback) => {
        console.log('MongoDB connect success!');
    });
    return db;
}