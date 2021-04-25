const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const superMarketController = require('../controllers/supermarketController');
const bodyParser = require('body-parser').json();

let user;

router.post('/register', bodyParser, function (req, res, next) {

    userController.getUserByUsername(req, (result) => {
        if(result === undefined || result == null || result.length <= 0){
            next();
        }else{
            res.status(404).send({ message: "Username already registered" });
        }
    });
});

router.post('/register', bodyParser, function (req, res, next) {

    userController.createUser(req, (result) => {
        superMarketController.getPublicKey(req, (superMarketPublicKey) => {
            const id       = result["_id"];        //id from db
            const username = result["username"];   //username from db
            console.log(id);
            res.json({ auth: true, id: id, username: username, superPKey: superMarketPublicKey});
        });
    });

});

//Check if username is already taken
router.post('/login', bodyParser, function (req, res, next) {

    userController.getUserByUsername(req, (result) => {
        if(result === undefined || result == null || result.length <= 0){
            res.status(404).send({ message: "Username Not found." });
        }else{
            next();
        }
    });

});

//Check if password is correct
router.post('/login', bodyParser, function (req, res, next) {

    userController.getUserPwd(req, (result) => {

        if(result === undefined || result == null || result.length <= 0){
            res.status(404).send({ message: "Password incorrect" });
        }else{
            user = result;
            superMarketController.getPublicKey(req, (superMarketPublicKey) => {
                // let id = result[0]._id;        //id from db
                // let username = result[0].username;   //username from db
                // console.log(id)
                // res.json({ auth: true, id: id, username: username, superPKey: superMarketPublicKey});
                next();
            });
        }
    });

});

router.post('/login', bodyParser, function (req, res, next) {

    userController.updatePublicKeyByUserId(req, (result) => {
        let id = user[0]._id;        //id from db
        let username = user[0].username;
        res.json({ auth: true, id: id, username: username, superPKey: superMarketPublicKey});
    });

});

router.post('/logout', bodyParser, function (req, res, next) {
    res.json({ auth: false, token: null });
});

router.put('/userPkChanged/:userId', bodyParser, function (req, res, next) {
    userController.updatePublicKeyByUserId(req, (result) => {
        res.send("Updated with success");
    });
});

module.exports = router;