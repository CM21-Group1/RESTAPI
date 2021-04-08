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

router.post('/purchase/:userId', bodyParser, function (req, res, next) {
    req.body.value = resultCreatePurchase.totalPrice;
    userController.updateAccumulatedValue(req, (result) => {
        next();
    });
});

router.post('/purchase/:userId', bodyParser, function (req, res, next) {
    userController.getUserById(req, (result) => {
        let accu_value = result.accumulatedValue;
        console.log(accu_value);
        if (accu_value % 100 === 0) {
            next();
        } else {
            console.log("Sem direito a voucher");
            res.send(result);
        }
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