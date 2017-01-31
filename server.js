'use strict';
//if test env, load example file
let env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (env === 'development' || !env) {
    require('dotenv').config();
}
/**
 * Module dependencies.
 */
const app = require('express')();
const fs = require('fs');
const passport = require('passport');
const logger = require('mean-logger');
const io = require('socket.io');
const config = require('./config/config');
const auth = require('./config/middlewares/authorization');
const mongoose = require('mongoose');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

//Load configurations
//Bootstrap db connection
mongoose.connect(config.db);

//Bootstrap models
let models_path = `${__dirname}/app/models`;
let walk = function (path) {
    fs.readdirSync(path).forEach(function (file) {
        let newPath = `${path}/${file}`;
        let stat = fs.statSync(newPath);

        if (stat.isFile()) {
            if (/(.*)\.(js|coffee)/.test(file)) {
                require(newPath);
            }
        } else if (stat.isDirectory()) {
            walk(newPath);
        }
    });
};

walk(models_path);

//bootstrap passport config
require('./config/passport')(passport);

app.use(function (req, res, next) {
    next();
});

//express settings
require('./config/express')(app, passport, mongoose);

//Bootstrap routes
require('./config/routes')(app, passport, auth);

//Start the app by listening on <port>
const server = app.listen(config.port, function() {
    console.log(`Express app started on port ${config.port}`);
});

const ioObj = io.listen(server, { log: false });
//game logic handled here
require('./config/socket/socket')(ioObj);


//Initializing logger
logger.init(app, passport, mongoose);

//expose app
module.exports = app;