//require("dotenv-safe").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const config = require('config');

mongoose.connect(config.DBHost, { useUnifiedTopology: true, useNewUrlParser: true });
//
// //don't show the log when it is test
// if(config.util.getEnv('NODE_ENV') !== 'test') {
//     //use morgan to log at command line
//     app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
// }

app.use(cookieParser());

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
});

//app.use(expressSession);

app.use(function (req, res, next) {

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const homeRoutes = require('./routes/userRoutes');
app.use('/', homeRoutes);

module.exports = app;