let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    payment_card: {type: String, required: true},
    publicKey: {type: String, required: false},
    accumulatedValue: {type: String, required: false},
    vouchers: [{
        userId: {type: String, required: false}
    }],
});

let User = mongoose.model('users', userSchema);

module.exports = User;