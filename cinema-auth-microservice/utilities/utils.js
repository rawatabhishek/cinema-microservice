const jsonWebToken = require('jsonwebtoken');

let utility = {};

utility.generateJWT = function(email, userId) {
    const secret = 'secret';
    return jsonWebToken.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        email:email,
        id: userId
    }, secret);
};

module.exports = utility;