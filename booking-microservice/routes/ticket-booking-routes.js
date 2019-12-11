const express = require('express');
const router = express.Router();
const cinemaTicketBookingService = require('../services/cinema-ticket-booking-service');

router.post('/booking/cinema/tickets', (req, res) => {
	return cinemaTicketBookingService.bookCinemaTickets(req, res);
});

router.get('/get-cinema-movie-details/:id', (req, res) => {
	return cinemaTicketBookingService.getCinemaMovieDetails(req, res);
})

module.exports = router;