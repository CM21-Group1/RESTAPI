const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const userController = require('../controllers/userController');

// Hello world test route
router.get('/', bodyParser, function (req, res) {
    res.send("Acme Electronic  Supermarket - REST API");
});

router.get('/users', bodyParser, function (req, res) {
    userController.getAllUsers(req, (result) => {
        res.send(result);
    });
});

router.get('/user/:id', bodyParser, function (req, res) {
    userController.getUserById(req, (result) => {
        res.send(result);
    });
});


module.exports = router;