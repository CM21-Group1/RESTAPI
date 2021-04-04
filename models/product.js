let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
    price: {type: Number, required: true},
    name: {type: String, required: true}
});

let Product = mongoose.model('products', productSchema);

module.exports = Product;