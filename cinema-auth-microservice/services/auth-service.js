const ObjectId = require('mongodb').ObjectID;
const dbConn = require('../utilities/dbConnection');
const utilities = require('../utilities/utils');
const axios = require('axios');

exports.forgotPassword = function (req, res) {
    const userEmail = req.body.email;
    const mailSubject = 'Reset your cinema microservice account password.';

    const collection = dbConn.getDb().collection('authentication');
    collection.find({ 'email': userEmail }).toArray()
        .then(response => {
            const passwordResetToken = utilities.generateUniqueId();
            collection.updateOne(
                {
                    email: userEmail
                },
                {
                    $set: {
                        forgot_password_token: passwordResetToken
                    }
                }
            )
                .then(insertResponse => {
                    const mailContent = `Please click on the below link to reset your password. ${process.env.APP_URL}/reset-password/${passwordResetToken}`;
                    const notificationUrl = process.env.NOTIFICATION_MICROSERVICE_URL;
                    const notificationPayload = {
                        userEmail: userEmail,
                        mailSubject: mailSubject,
                        mailContent: mailContent
                    }
                    return axios.post(notificationUrl, notificationPayload)
                        .then(response => {
                            return res.send({ status: 1, message: "Password reset mail has been successfully sent to the registered email address." });
                        })
                        .catch(error => {
                            return res.status(400).send({ message: 'Error in sending email.', error: error.message });
                        });

                })
                .catch(error => {
                    return res.status(400).send({ message: 'Error in saving token.', error: error.message });
                });
        })
        .catch(error => {
            return res.send({ status: 1, message: "Password reset mail has been successfully sent to the registered email address." });
        });
};

exports.resetPassword = function (req, res) {
    const newPassword = req.body.password;
    const forgotToken = req.params.id;
    const collection = dbConn.getDb().collection('authentication');
    collection.updateOne(
        {
            forgot_password_token: forgotToken
        },
        {
            $set: {
                forgot_password_token: null,
                password: newPassword
            }
        }
    )
        .then(insertResponse => {
            if (insertResponse.matchedCount === 0 && insertResponse.modifiedCount === 0) {
                return res.status(400).send({ status: 0, message: "Invalid token" });
            } else {
                return res.send({ status: 1, message: "Password has been successfully reset." });
            }
        })
        .catch(error => {
            return res.status(400).send({ message: 'Error in password reset.', error: error.message });
        });

};
