const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const config = require('config');

mongoose.connect(config.DBHost, { useUnifiedTopology: true, useNewUrlParser: true });

app.use(cookieParser());

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

const homeRoutes = require('./routes/userRoutes');
app.use('/', homeRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

module.exports = app;