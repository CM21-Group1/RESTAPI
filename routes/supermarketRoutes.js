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

//Este não é  acho eu 
/*router.post('/purchase/:userId', bodyParser, function (req, res, next) {
    req.body.value = resultCreatePurchase.totalPrice;
    /*userController.updateAccumulatedValue(req, (result) => {
        next();
    });
});*/

router.post('/purchase/:userId', bodyParser, function (req, res, next) {
    userController.getUserById(req, (result) => {
        // if ((accu_value + resultCreatePurchase['totalPrice']) / 100 >= 1) {
        //     next();
        // } else {
        //     console.log("Sem direito a voucher");
        //     res.send(result);
        // }

        let num_vouchers = Math.floor((result.accumulatedValue + resultCreatePurchase['totalPrice']) / 100);

        let accu_value_new = (result.accumulatedValue + resultCreatePurchase['totalPrice'] - (num_vouchers * 100)) % 100;

        req.body.value = accu_value_new;
        req.body.num_vouchers = num_vouchers;
        userController.updateAccumulatedValue(req, (result) => {
            console.log("NUM DE VOUCHERS QUE DEVE CRIAR" + num_vouchers);
            console.log("VALOR ACUMULADOR" + accu_value_new);
            next();
        });

        superMarketController.createVoucherByUserId(req, (result) => {
            //res.send(result);
        });


    });
});


/* Ver melhor a cena de ser sincrono
router.post('/purchase/:userId', bodyParser, function (req, res, next) {
    userController.getUserById(req, (result) => {
        // if ((accu_value + resultCreatePurchase['totalPrice']) / 100 >= 1) {
        //     next();
        // } else {
        //     console.log("Sem direito a voucher");
        //     res.send(result);
        // }
        const myPromise = new Promise(function(){
            let num_vouchers = Math.floor((result.accumulatedValue + resultCreatePurchase['totalPrice']) / 100);

            let accu_value_new = (result.accumulatedValue + resultCreatePurchase['totalPrice'] - (num_vouchers * 100)) % 100;
    
            req.body.value = accu_value_new;
            req.body.num_vouchers = num_vouchers;
            userController.updateAccumulatedValue(req, (result) => {
                console.log("NUM DE VOUCHERS QUE DEVE CRIAR" + num_vouchers);
                console.log("VALOR ACUMULADOR" + accu_value_new);
                next();
            });
        })
       
        myPromise.then(function(){
            superMarketController.createVoucherByUserId(req, (result) => {
                //res.send(result);
            });
        })

    });
});


/*router.post('/purchase/:userId', bodyParser, function (req, res, next) {
    superMarketController.createVoucherByUserId(req, (result) => {
        console.log("voucher criado");
        res.send(result);
    });
});*/

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