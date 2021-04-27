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

// TESTING!!!!!!!!!!!!!!!!!!
//############################################################################################################################################
//############################################################################################################################################
//############################################################################################################################################

// var publicKey = '-----BEGIN PUBLIC KEY-----\n'+
// 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyCtxfK4QUfRF1ej5+FlRb6wk8taLICBNbtqver9M6WzAY7JwbTqH5Mz9+9CMeKCDILoJpIHWVXPgmq+UvwXtH/3c09CYXqRv4WDp+HJA37jlnPW1tJNjkWnN8CC4MixSUq3I8JJ501Ff5c3vc03Ws7OSZUUua/PTpnHUUMDKU4BSQ5576S2413YSTvl6ggNhNRCUAppLyMRteO/0ykyL2IUO/vdvPF/o8Gg0fOlldx6px1MQURYFAW9TPJe42UUgKWtH9gQ06TjhCbUKLTnPI8QbWRB/6hYiQ6rgAX+G85Bm6FR2mV5O6ScLCz9o9uHXSCdRwUlg1WUFTpgpG4Zt4wIDAQAB\n'+
// '-----END PUBLIC KEY-----';
//
// var mensagem = '{"userId": "608573888915f60015e1c445", "products": [{"_id": "Teste", "name": "test", "price": 0.3586371799442135, "quantity": 1}], "totalPrice": 0.3586371799442135}';
//
// var sign = "Bca5lrvF0Rxha33H6fhuAbvD72ST6DOMscBmIuRqJxEhcUg9Zg0n1L19dtnENkb99APm6AjKiYpSb6UNaL9xLZ6YUeppTTFUEKoQEIpwxLTpKCX3oMA073vOY9Gbr9bUaGSRtRilVjIZLeG//xwqXgpGttWnv44BYxAzGpD4Jz8xh2Hb1cYZlfr8RUlCWhPxx+LHogr9+yawJJmxddjYfmFAQk7Kgjf2jjaFElDdPqPWcMLnJg98F+R0g4F/QGHqWBZgw0ejB9K2ucuiCQg3euTyFfNxqpTqCqZzPc8RuDsnDmPXuruet9oiXaK06OEH9Yv/6qyDYNm6wn03CxqLwQ==";
//
// var verifier = crypto.createVerify('sha256');
// verifier.update(mensagem);
// var ver = verifier.verify(publicKey, sign,'base64');
// console.log(ver);

/*
var privateKey = '-----BEGIN RSA PRIVATE KEY-----\n'+
'MIICXQIBAAKBgQDCtTEic76GBqUetJ1XXrrWZcxd8vJr2raWRqBjbGpSzLqa3YLv\n'+
'VxVeK49iSlI+5uLX/2WFJdhKAWoqO+03oH4TDSupolzZrwMFSylxGwR5jPmoNHDM\n'+
'S3nnzUkBtdr3NCfq1C34fQV0iUGdlPtJaiiTBQPMt4KUcQ1TaazB8TzhqwIDAQAB\n'+
'AoGAM8WeBP0lwdluelWoKJ0lrPBwgOKilw8W0aqB5y3ir5WEYL1ZnW5YXivS+l2s\n'+
'tNELrEdapSbE9hieNBCvKMViABQXj4DRw5Dgpfz6Hc8XIzoEl68DtxL313EyouZD\n'+
'jOiOGWW5UTBatLh05Fa5rh0FbZn8GsHrA6nhz4Fg2zGzpyECQQDi8rN6qhjEk5If\n'+
'+fOBT+kjHZ/SLrH6OIeAJ+RYstjOfS0bWiM9Wvrhtr7DZkIUA5JNsmeANUGlCrQ2\n'+
'cBJU2cJJAkEA26HyehCmnCkCjit7s8g3MdT0ys5WvrAFO6z3+kCbCAsGS+34EgnF\n'+
'yz8dDdfUYP410R5+9Cs/RkYesqindsvEUwJBALCmQVXFeKnqQ99n60ZIMSwILxKn\n'+
'Dhm6Tp5Obssryt5PSQD1VGC5pHZ0jGAEBIMXlJWtvCprScFxZ3zIFzy8kyECQQDB\n'+
'lUhHVo3DblIWRTVPDNW5Ul5AswW6JSM3qgkXxgHfYPg3zJOuMnbn4cUWAnnq06VT\n'+
'oHF9fPDUW9GK3yRbjNaJAkAB2Al6yY0KUhYLtWoEpQ40HlATbhNel2cn5WNs6Y5F\n'+
'2hedvWdhS/zLzbtbSlOegp00d2/7IBghAfjAc3DE9DZw\n'+
'-----END RSA PRIVATE KEY-----';

var publicKey = '-----BEGIN PUBLIC KEY-----\n'+
'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDCtTEic76GBqUetJ1XXrrWZcxd\n'+
'8vJr2raWRqBjbGpSzLqa3YLvVxVeK49iSlI+5uLX/2WFJdhKAWoqO+03oH4TDSup\n'+
'olzZrwMFSylxGwR5jPmoNHDMS3nnzUkBtdr3NCfq1C34fQV0iUGdlPtJaiiTBQPM\n'+
't4KUcQ1TaazB8TzhqwIDAQAB\n'+
'-----END PUBLIC KEY-----';

var signer = crypto.createSign('sha256WithRSAEncryption');
signer.update('hola');
var sign = signer.sign(privateKey,'base64');

var verifier = crypto.createVerify('sha256WithRSAEncryption');
verifier.update('hola');
var ver = verifier.verify(publicKey, sign,'base64');
console.log(ver);


*/
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