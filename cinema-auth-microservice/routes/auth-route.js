const express = require('express');
const router = express.Router();
const authService = require('../services/auth-service');
const passport = require('passport');
const utilities = require('../utilities/utils');
require('../strategy/localStrategy');


router.post('/login', (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {      
        if (err) {
            return res.status(401).json(err);
        }
        if (user) {
            const token = utilities.generateJWT(user);
            user['access_token'] = token;
            return res.send(user);
        } else {
            res.status(401).json(info);
        }
    })(req, res, next)
});

module.exports = router;