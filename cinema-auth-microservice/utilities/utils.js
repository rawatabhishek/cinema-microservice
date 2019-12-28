const jsonWebToken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid/v1');

let utility = {};

utility.generateJWT = function (email, userId) {
    const privateKey = fs.readFileSync(path.join(__dirname, '../private.key'));
    return jsonWebToken.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        email: email,
        id: userId
    }, privateKey, { algorithm: 'RS256'});
};

utility.generateUniqueId = function () {
    return uuid();
}

module.exports = utility;