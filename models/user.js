var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    payment_card: {type: String, required: true},
    //public key
    //Accumulated value
});

var User = mongoose.model('users', userSchema);

module.exports = User;