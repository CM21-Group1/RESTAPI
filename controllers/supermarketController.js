const {ObjectId} = require("bson");
let crypto = require('crypto');
const Supermarket = require("../models/supermarket");
const Purchase = require("../models/purchase");
const Voucher = require("../models/voucher");
const Product = require("../models/product");

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});

function generateSupermarketKeys(req, callback) {
    new Supermarket({
        publicKey: publicKey
    }).save().then(r => {callback(r)});
}

function getPublicKey(req, callback) {

    // console.log(privateKey);
    // console.log(publicKey);

    Supermarket.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, result) {
        if (err) {
            console.log(err);
            callback(err);
        }

        callback(result['publicKey']);
    });

}

function getPrivateKey(req, callback) {

    Supermarket.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, result) {
        if (err) {
            console.log(err);
            callback(err);
        }

        callback(result['privateKey']);
    });

}

function createPurchase(req, callback) {
    req.body.userId = req.params.userId;

    let purchase = new Purchase(req.body);
    purchase.save(function (err, result) {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            callback(result);
        }
    });
}

function getPurchaseByUserId(req, callback) {
    let user_id = req.params.userId;

    Purchase.find({userId: user_id}, (err, result) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(result);
    });
}

function getVoucherByUserId(req, callback) {
    let user_id = req.params.userId;

    Voucher.find({userId: user_id}, (err, result) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(result);
    });
}

function getProducts(req, callback) {
    Product.find( {}, (err, result) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(result);
    });
}

function createProduct(req, callback) {
    let product = new Product(req.body);
    product.save(function (err, result) {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            callback(result);
        }
    });
}

function createVoucherByUserId(req, callback) {
    let userId = req.params.userId;

    let body = {
        userId: userId
    }

    let voucher = new Voucher(body);
    voucher.save(function (err, result) {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            callback(result);
        }
    });
}

function removeVoucherById(req, callback) {
    let voucherId = req.body.voucherId;

    Voucher.findByIdAndRemove({_id: voucherId}, (err, result) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(result);
    });
}

function updateSupermarketPublicKey(req, callback) {
    let id = "6085c20769d026168cd87c60"
    let o_id = new ObjectId(id);
    console.log(req.body.publicKey);
    Supermarket.findOneAndUpdate({_id: o_id}, {"publicKey": req.body.publicKey}, (err, result) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(result);
    });
}

exports.updateSupermarketPublicKey = updateSupermarketPublicKey;
exports.generateSupermarketKeys = generateSupermarketKeys;
exports.getPublicKey = getPublicKey;
exports.getPrivateKey = getPrivateKey;
exports.createPurchase = createPurchase;
exports.getPurchaseByUserId = getPurchaseByUserId;
exports.createVoucherByUserId = createVoucherByUserId;
exports.getVoucherByUserId = getVoucherByUserId;
exports.getProducts = getProducts;
exports.createProduct = createProduct;
exports.removeVoucherById = removeVoucherById;