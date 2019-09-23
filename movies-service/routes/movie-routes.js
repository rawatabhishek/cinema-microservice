const express = require('express');
const router = express.Router();
const movieService = require('../services/movie-service');

router.get('/movie/:id', (req, res) => {
	return movieService.getMovieById(req, res);
});

router.get('/movie/cinemaId', (req, res) => {
	return movieService.getMoviesByCinemaId(req, res);
});

module.exports = router;