const express = require('express');
const router = express.Router();
const authService = require('../services/auth-service');
const passport = require('passport');
require('../strategy/localStrategy');
const utilities = require('../utilities/utils');

const dbConn = require('../utilities/dbConnection');


router.post('/login', (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {      
        if (err) {
            return res.status(401).json(err);
        }
        if (user) {
            const email = user.email;
            const userId = user._id;
            const token = utilities.generateJWT(email, userId);
            console.log(token);
            return res.status(200).json({
                "token": 'token'
            });
        } else {
            res.status(401).json(info);
        }
    })(req, res, next)
});

module.exports = router;