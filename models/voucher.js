var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    //ID user
    //ID voucher
});

var User = mongoose.model('users', userSchema);

module.exports = User;