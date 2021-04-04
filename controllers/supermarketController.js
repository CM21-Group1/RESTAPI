const {ObjectId} = require("bson");
let crypto = require('crypto');
const Supermarket = require("../models/supermarket");

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

    // console.log(privateKey);
    // console.log(publicKey);

    new Supermarket({
        privateKey: privateKey,
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

exports.generateSupermarketKeys = generateSupermarketKeys;
exports.getPublicKey = getPublicKey;