let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let purchaseSchema = new Schema({
    idUser: {type: String, required: true},
    products: [{
        productId: {type: String, required: true},
        price: {type: Number, required: true},
        name: {type: String, required: true}
    }],
    totalPrice: {type: Number, required: true}
});

let Purchase = mongoose.model('purchases', purchaseSchema);

module.exports = Purchase;