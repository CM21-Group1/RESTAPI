const express = require('express');
const router = express.Router();
const superMarketController = require('../controllers/supermarketController');
const userController = require('../controllers/userController');
const bodyParser = require('body-parser').json();

let resultCreatePurchase;

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

// ----------------------------------------------------------------------POST-CREATE PURCHASE----------------------------------------------------------------------

router.post('/purchase/:userId', bodyParser, function (req, res, next) {
    superMarketController.createPurchase(req, (result) => {
        resultCreatePurchase = result;
        next();
    });
});

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