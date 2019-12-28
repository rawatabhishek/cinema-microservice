const sendGridMail = require('@sendgrid/mail');
sendGridMail.setApiKey(process.env.SG_API_KEY);

exports.sendEmailNotification = function (req, res) {
    const email = req.body.userEmail;
    const subject = req.body.mailSubject;
    const content = req.body.mailContent;
    let mailContent = {
        to: email,
        from: process.env.SG_FROM,
        subject: subject,
        html: content,
    };

    sendGridMail.send(mailContent);
    return res.send({status: 1, message: 'Mail sent successfully.'});
};