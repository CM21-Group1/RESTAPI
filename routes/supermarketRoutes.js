const express = require('express');
const router = express.Router();
const superMarketController = require('../controllers/supermarketController');
const userController = require('../controllers/userController');
const bodyParser = require('body-parser').json();
const crypto = require('crypto');

let resultCreatePurchase;
let pubKey;

const admin = require('firebase-admin');
const serviceAccount = require("../acme-dfe8d-firebase-adminsdk-s81uo-cd3e6644b8.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

router.get('/keys', bodyParser, function (req, res, next) {

    superMarketController.generateSupermarketKeys(req, (result) => {
        res.send(result);
    });
});

router.get('/getPublicKey', bodyParser, function (req, res, next) {
    superMarketController.getPublicKey(req, (result) => {
        res.send(result);
    });
});

router.get('/getPrivateKey', bodyParser, function (req, res, next) {
    superMarketController.getPrivateKey(req, (result) => {
        res.send(result);
    });
});

router.get('/purchase/:userId', bodyParser, function (req, res, next) {
    superMarketController.getPurchaseByUserId(req, (result) => {
        res.send(result);
    });
});

// EXAMPLE-----------------------------------------

router.post('/purchaseFake', bodyParser, function (req, res, next) {
    let userId = req.body.message.userId;
    let pubKey;
    req.body.userId = userId;
    userController.getUserPublicKeyById(req, (result)=>{
        pubKey = result.publicKey;
        console.log(pubKey);
    });
});

// EXAMPLE-----------------------------------------

// ----------------------------------------------------------------------POST-CREATE PURCHASE----------------------------------------------------------------------
router.post('/purchase/:userId', bodyParser, function (req, res, next) {
    userController.getUserPublicKeyById(req, (result)=>{
        pubKey = '-----BEGIN PUBLIC KEY-----\n'+result.publicKey+'\n-----END PUBLIC KEY-----';
        next();
    });
});

router.post('/purchase/:userId', bodyParser, function (req, res, next) {
    let message = req.body.message;
    let message_str = JSON.stringify(message);
    let signature = req.body.signature;
    let signature_str = JSON.stringify(signature);
    let verifier = crypto.createVerify('sha256');
    verifier.update(message_str);
    let ver = verifier.verify(pubKey, signature_str,'base64');
    if(ver){
        next()
    }else{
        res.send("Authentication failed.");
    }
});

router.post('/purchase/:userId', bodyParser, function (req, res, next) {
    req.body = req.body.message;
    superMarketController.createPurchase(req, (result) => {
        resultCreatePurchase = result;
        next();
    });
});

// SEND PUSH NOTIFICATION
router.post('/purchase/:userId', bodyParser, function (req, res, next) {
    let topic = req.params.userId;
    let message = {
        data: {
            "title": 'TEST',
            "body": 'Purchase Made'
        },
        topic: topic
    };

// Send a message to devices subscribed to the provided topic.
    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });

    next();
});

router.post('/purchase/:userId', bodyParser, function (req, res, next) {
    if(req.body.voucherId != null){
        superMarketController.removeVoucherById(req, (result) => {
            next();
        });
    }else{
        next();
    }
});

router.post('/purchase/:userId', bodyParser, function (req, res, next) {
    userController.getUserById(req, (result) => {
        let accumulatedValue = parseFloat(result.accumulatedValue);
        let totalPrice = parseFloat(req.body.totalPrice);

        // let num_vouchers = Math.floor((result.accumulatedValue + req.body.totalPrice) / 100);
        let num_vouchers = Math.floor((accumulatedValue + totalPrice) / 100);

        // let accu_value_new = (result.accumulatedValue + req.body.totalPrice - (num_vouchers * 100)) % 100;
        let accu_value_new = (accumulatedValue + totalPrice - (num_vouchers * 100)) % 100;
        let accu_value_new_str = accu_value_new.toString();

        req.body.value = accu_value_new_str;
        userController.updateAccumulatedValue(req, (result) => {
            console.log(num_vouchers);
            console.log(accu_value_new_str);
            next();
        });
    });

});

router.post('/purchase/:userId', bodyParser, function (req, res, next) {
    superMarketController.createVoucherByUserId(req, (result) => {
        console.log("voucher criado");
        res.send(result);
    });
});


// ----------------------------------------------------------------------POST-CREATE PURCHASE----------------------------------------------------------------------

router.get('/vouchers/:userId', bodyParser, function (req, res, next) {
    superMarketController.getVoucherByUserId(req, (result) => {
        res.send(result);
    });
});

router.get('/products', bodyParser, function (req, res, next) {
    superMarketController.getProducts(req, (result) => {
        res.send(result);
    });
});

router.post('/product', bodyParser, function (req, res, next) {
    superMarketController.createProduct(req, (result) => {
        res.send(result);
    });
});

router.put('/updatePublicKey', bodyParser, function (req, res, next) {
    superMarketController.updateSupermarketPublicKey(req, (result) => {
        res.send(result);
    });
});

module.exports = router;