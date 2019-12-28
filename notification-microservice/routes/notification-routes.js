const express = require('express');
const router = express.Router();
const notificationService = require('../services/notification-service');

router.post('/send-email-notification', (req, res) => {
	return notificationService.sendEmailNotification(req, res);
});

module.exports = router;