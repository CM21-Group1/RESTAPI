var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var voucherSchema = new Schema({
    //ID user
    //ID voucher
    userId: {type: String, required: true}
});

var Voucher = mongoose.model('vouchers', voucherSchema);

module.exports = Voucher;