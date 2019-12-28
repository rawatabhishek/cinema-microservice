const express = require('express');
const router = express.Router();
const cinemaTicketBookingService = require('../services/cinema-ticket-booking-service');
const authMiddleware = require('../middlewares/authMiddleware').authMiddleware;

router.post('/booking/cinema/tickets', (req, res) => {
	return cinemaTicketBookingService.bookCinemaTickets(req, res);
});

/** Authenticated Route */
router.get('/get-cinema-movie-details/:id', authMiddleware, (req, res) => {
	return cinemaTicketBookingService.getCinemaMovieDetails(req, res);
});

router.post('/save-booking-details', authMiddleware, (req, res) => {
	return cinemaTicketBookingService.saveBookingDetails(req, res);
});

module.exports = router;