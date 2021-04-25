const express = require('express');
const router = express.Router();
const superMarketController = require('../controllers/supermarketController');
const userController = require('../controllers/userController');
const bodyParser = require('body-parser').json();

let resultCreatePurchase;

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
    // const obj = JSON.parse(req.body['original']);
    // console.log(obj);
    //
    // let privateKey = crypto.createPrivateKey({
    //     'key': encodedPrivateKeyString,
    //     'format': 'pem',
    //     'type': 'pkcs8',
    //     'cipher': 'aes-256-cbc',
    //     'passphrase': 'passphrase'
    // });
    //
    // // validation of the signature
    // req.body = obj;
    console.log(req.body)
});

// EXAMPLE-----------------------------------------

// ----------------------------------------------------------------------POST-CREATE PURCHASE----------------------------------------------------------------------

router.post('/purchase/:userId', bodyParser, function (req, res, next) {
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

    res.send("Acme Electronic  Supermarket - REST API");
});
//////

// NAO TESTADO
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
    req.body.value = resultCreatePurchase.totalPrice;
    userController.updateAccumulatedValue(req, (result) => {
        next();
    });
});

router.post('/purchase/:userId', bodyParser, function (req, res, next) {
    userController.getUserById(req, (result) => {
        let num_vouchers = Math.floor((result.accumulatedValue + resultCreatePurchase['totalPrice']) / 100);

        let accu_value_new = (result.accumulatedValue + resultCreatePurchase['totalPrice'] - (num_vouchers * 100)) % 100;

        req.body.value = accu_value_new;
        userController.updateAccumulatedValue(req, (result) => {
            console.log(num_vouchers);
            console.log(accu_value_new);
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

module.exports = router;