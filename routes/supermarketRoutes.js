const express = require('express');
const router = express.Router();
const superMarketController = require('../controllers/supermarketController');
const bodyParser = require('body-parser').json();

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

module.exports = router;