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

router.post('/purchase/:userId', bodyParser, function (req, res, next) {
    superMarketController.createPurchase(req, (result) => {
        resultCreatePurchase = result;
        next();
    });
});

router.post('/purchase/:userId', bodyParser, function (req, res, next) {
    superMarketController.getPurchaseByUserId(req, (result) => {
        let total = 0;
        for (let i = 0; i < result.length; i++) {
            total += result[i].totalPrice;
        }

        if (total > 100) {
            next();
        } else {
            console.log("Sem direito a voucher");
            res.send(result);
        }


    });
});

router.post('/purchase/:userId', bodyParser, function (req, res, next) {
    superMarketController.createPurchase(req, (result) => {
        console.log("voucher criado");
        res.send(result);
    });
});

module.exports = router;