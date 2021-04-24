const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const config = require('config');
const crypto = require('crypto');
const rsa = require('node-rsa');

mongoose.connect(config.DBHost, { useUnifiedTopology: true, useNewUrlParser: true });

app.use(cookieParser());

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());





// TESTING!!!!!!!!!!!!!!!!!!
//############################################################################################################################################
//############################################################################################################################################
//############################################################################################################################################

// This is the data we want to encrypt
// const data = "my secret data"
// const { publicKey2, privateKey } = crypto.generateKeyPairSync("rsa", {
//     // The standard secure default length for RSA keys is 2048 bits
//     modulusLength: 2048,
// })
//
// let publicKey = "-----BEGIN PUBLIC KEY-----\nAIjCfxr14b4KrDH5BSlgp7lDfxFfqfQ9pJdmCpukDLbBOVWt7/3GBPy24LaEdYneIQpkD6/kfwbVLCQcC4DLkOwq5wyFDgCQIXMVz4D/lfpE36wMk8+BYX91B6gErlWtLtKZtC0uPB3nmt1UhFotCP/om5Krp/kzfyKE/u6MJUwKRzJeB6oJAH1W2PttRxTgN4OvdTMKpaMBdfWh/4kVupTw6mLSzZGFKrLZ" +
//     "cvyyM9V9nNIKRe4UXSnfyEzHOWksJN/gXPB0tioNHzO7bMg8B6EvPggTZlpG8agNqLCJLhvrNasareWS7l2N4Ttomd4LnxB3vMaStmMJnZ2VxuYmBsc=\n-----END PUBLIC KEY-----";
//
// const encryptedData = crypto.publicEncrypt(
//     {
//         key: publicKey,
//         padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//         oaepHash: "sha256",
//     },
//     // We convert the data string to a buffer using `Buffer.from`
//     Buffer.from(data)
// )
// // The encrypted data is in the form of bytes, so we print it in base64 format
// // so that it's displayed in a more readable form
// console.log("encypted data: ", encryptedData.toString("base64"));
//
//
// const decryptedData = crypto.privateDecrypt(
//     {
//         key: privateKey,
//         // In order to decrypt the data, we need to specify the
//         // same hashing function and padding scheme that we used to
//         // encrypt the data in the previous step
//         padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
//         oaepHash: "sha256",
//     },
//     encryptedData
// )
//
// // The decrypted data is of the Buffer type, which we can convert to a
// // string to reveal the original data
// console.log("decrypted data: ", decryptedData.toString())
//
// // Create some sample data that we want to sign
// const verifiableData = "this need to be verified"
//
// // The signature method takes the data we want to sign, the
// // hashing algorithm, and the padding scheme, and generates
// // a signature in the form of bytes
// const signature = crypto.sign("sha256", Buffer.from(verifiableData), {
//     key: privateKey,
//     padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
// })
//
// console.log(signature.toString("base64"))
//
// // To verify the data, we provide the same hashing algorithm and
// // padding scheme we provided to generate the signature, along
// // with the signature itself, the data that we want to
// // verify against the signature, and the public key
// const isVerified = crypto.verify(
//     "sha256",
//     Buffer.from(verifiableData),
//     {
//         key: publicKey,
//         padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
//     },
//     signature
// )
//
// // isVerified should be `true` if the signature is valid
// console.log("signature verified: ", isVerified)
//
// console.log(publicKey);

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