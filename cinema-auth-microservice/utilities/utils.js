const jsonWebToken = require('jsonwebtoken');
const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SG_API_KEY);
const uuid = require('uuid/v1');

let utility = {};

utility.generateJWT = function (email, userId) {
    const secret = 'secret';
    return jsonWebToken.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        email: email,
        id: userId
    }, secret);
};

utility.sendMailtoUser = function (to, subject, content) {
    let mailContent = {
        to: to,
        from: process.env.SG_FROM,
        subject: subject,
        html: content,
    };

    sendGridMail.send(mailContent);
};

utility.generateUniqueId = function () {
    return uuid();
}

module.exports = utility;