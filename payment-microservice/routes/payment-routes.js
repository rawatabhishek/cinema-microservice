const express = require('express');
const router = express.Router();
const paymentService = require('../services/payment-service');

router.post('/payment/charge-payment', (req, res) => {
	return paymentService.chargePayment(req, res);
});


module.exports = router;