const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/userController');
const bodyParser = require('body-parser').json();


router.post('/register', bodyParser, function (req, res, next) {

    usercontroller.getUserByUsername(req, (result) => {
        if(result === undefined || result == null || result.length <= 0){
            next();
        }else{
            res.status(404).send({ message: "Username already registered" });
        }
    });
});

router.post('/register', bodyParser, function (req, res, next) {

    usercontroller.createUser(req, (result) => {
        const id       = result._id;        //id from db
        const username = result.username;   //username from db (to figure out if admin)
        res.json({ auth: true, id: id, username:username});
    });

});

//Check if username is already taken
router.post('/login', bodyParser, function (req, res, next) {

    usercontroller.getUserByUsername(req, (result) => {
        if(result === undefined || result == null || result.length <= 0){
            res.status(404).send({ message: "Username Not found." });
        }else{
            next();
        }
    });

});

//Check if password is correct
router.post('/login', bodyParser, function (req, res, next) {

    usercontroller.getUserPwd(req, (result) => {

        if(result === undefined || result == null || result.length <= 0){
            res.status(404).send({ message: "Password incorrect" });
        }else{
            const id       = result[0]._id;        //id from db
            const username = result[0].username;   //username from db
            res.json({ auth: true, id: id, username: username});
        }
    });

});

router.post('/logout', bodyParser, function (req, res, next) {
    res.json({ auth: false, token: null });
});


module.exports = router;