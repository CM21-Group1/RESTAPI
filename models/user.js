var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String, required: false}
});

var User = mongoose.model('users', userSchema);

module.exports = User;