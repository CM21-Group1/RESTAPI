let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let supermarketSchema = new Schema({
    publicKey: {type: String, required: false}
});

let Supermarket = mongoose.model('supermarket', supermarketSchema);

module.exports = Supermarket;