let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let purchaseSchema = new Schema({
    userId: {type: String, required: true},
    products: [{
        _id: {type: String, required: false},
        price: {type: String, required: false},
        name: {type: String, required: false}
    }],
    totalPrice: {type: String, required: false},
    voucherId: {type: String, required: false},
    createdAt: {type: Date, default: Date.now, required: false}
});

let Purchase = mongoose.model('purchases', purchaseSchema);

module.exports = Purchase;