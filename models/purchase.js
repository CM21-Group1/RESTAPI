let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let purchaseSchema = new Schema({
    userId: {type: String, required: true},
    products: [{
        _id: {type: String, required: false},
        price: {type: Number, required: false},
        name: {type: String, required: false}
    }],
    totalPrice: {type: Number, required: false},
    voucherId: {type: Number, required: false},
    createdAt: {type: Date, default: Date.now, required: false}
});

let Purchase = mongoose.model('purchases', purchaseSchema);

module.exports = Purchase;