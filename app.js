const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const config = require('config');
const crypto = require('crypto');
const rsa = require('node-rsa');

mongoose.connect(config.DBHost, { useUnifiedTopology: true, useNewUrlParser: true });

app.use(cookieParser());

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

// TESTING!!!!!!!!!!!!!!!!!!
//############################################################################################################################################
//############################################################################################################################################
//############################################################################################################################################

let key = new rsa({b: 512});
let publicKey = "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKrTop707ZoaedMNI+Eas4kRP6Z2fT0AGBLZyRbGVxUO\n" +
    "    d8YH1lveX7DB1QkcXZ7M/jWv83mPR8I5lzu0hnl/tj8CAwEAAQ=="
let publicK = "-----BEGIN PUBLIC KEY-----\n"+publicKey+"\n"+"-----END PUBLIC KEY-----";
//key.importKey(publicK,"pkcs8-public-pem");
let signature = "nNQ4NvMHoaWoCDs9SjkEwi8BXfudv9xeW38Kk/Cf/d84Nydop6OqRy+Tjlwk3axZYqxPiH8nzZbF8Cr/MNeVrg=="

let verifier = crypto.createVerify('RSA-SHA256');
// verifier.update(sign);
let ver = verifier.verify(publicK, signature,'base64');
console.log(ver);

let verifierObject = crypto.createVerify("RSA-SHA256");
verifierObject.update(" ");
let verified = verifierObject.verify({key:publicK, padding:crypto.constants.RSA_PKCS1_PSS_PADDING}, signature, "base64");
console.info("is signature ok?: %s", verified);

//############################################################################################################################################
//############################################################################################################################################
//############################################################################################################################################

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

const productRoutes = require('./routes/productRoutes');
app.use('/product', productRoutes);

const supermarketRoutes = require('./routes/supermarketRoutes');
app.use('/sp', supermarketRoutes);

module.exports = app;