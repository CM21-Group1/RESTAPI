let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let voucherSchema = new Schema({
    //ID user
    //ID voucher
    userId: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});

let Voucher = mongoose.model('vouchers', voucherSchema);

module.exports = Voucher;