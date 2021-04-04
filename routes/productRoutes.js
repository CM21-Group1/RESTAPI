const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const userController = require('../controllers/userController');

// Hello world test route
router.get('/getProduct', bodyParser, function (req, res) {
    userController.getAllUsers(req, (result) => {
        res.send(result);
    });
});


module.exports = router;