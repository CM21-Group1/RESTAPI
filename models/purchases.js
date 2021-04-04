var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    //Array produtos
    //Array vouchers
    //Id supermarket
    idUser: {type: String, required: true},
    password: {type: String, required: true},
    payment_card: {type: String, required: true}
});

var User = mongoose.model('users', userSchema);

module.exports = User;