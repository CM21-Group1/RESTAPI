let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let supermarketSchema = new Schema({
    privateKey: {type: String, required: true},
    publicKey: {type: String, required: true}
});

let Supermarket = mongoose.model('supermarket', supermarketSchema);

module.exports = Supermarket;