const User = require("../models/user");
const {ObjectId} = require("bson");

function getAllUsers(req, callback) {
    User.find({}, (err, result) => {
        if (err) {
            console.log(err);
            callback(err);
        }

        callback(result);
    });
}

function createUser(req, callback) {
    let user = new User(req.body);

    user.save(function (err, result) {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            callback(result);
        }
    });
}

function getUserById(req, callback) {
    let user_id = req.params.userId;
    let o_id = new ObjectId(user_id);

    User.findById(o_id, (err, result) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(result);
    });
}

function getUserPublicKeyById(req, callback) {
    let user_id = req.params.userId;
    let o_id = new ObjectId(user_id);

    User.findById(o_id, (err, result) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(result);
    });
}

function updatePublicKeyByUsername(req, callback) {
    User.findOneAndUpdate({username: req.body.username}, {"publicKey": req.body.publicKey}, (err, result) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(result);
    });
}

function updateAccumulatedValue(req, callback) {
    let value_to_accumulate = req.body.value;
    let user_id = req.params.userId;
    let o_id = new ObjectId(user_id);

    User.findOneAndUpdate({_id :o_id}, {'accumulatedValue' : value_to_accumulate}, (err, result) => {
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(result);
    });
}

function getUserByUsername(req, callback) {
    User.findOne({ username: req.body.username}, (err, result) => {
        if (err) {
            console.log(err);
            callback(err);
        }

        callback(result);
    });
}

function getUserPwd(req, callback) {
    User.find({ username: req.body.username, password: req.body.password}, (err, result) => {
        if (err) {
            console.log(err);
            callback(false);
        }

        callback(result);
    });
}

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.getUserById = getUserById;
exports.getUserByUsername = getUserByUsername;
exports.getUserPwd = getUserPwd;
exports.updateAccumulatedValue = updateAccumulatedValue;
exports.updatePublicKeyByUsername = updatePublicKeyByUsername;
exports.getUserPublicKeyById = getUserPublicKeyById;