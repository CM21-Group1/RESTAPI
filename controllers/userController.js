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
    let user_id = req.params.id;
    let o_id = new ObjectId(user_id);

    User.findById(o_id, (err, result) => {
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