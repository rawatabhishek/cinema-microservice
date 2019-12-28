const express = require('express');
const router = express.Router();
const paymentService = require('../services/payment-service');
const authMiddleware = require('../middlewares/authMiddleware').authMiddleware;

/** Authenticated Routes */
router.post('/payment/charge-payment', authMiddleware, (req, res) => {
	return paymentService.chargePayment(req, res);
});


module.exports = router;