const express = require('express');
const router = express.Router();
const movieService = require('../services/movie-service');
const authMiddleware = require('../middlewares/authMiddleware').authMiddleware;

router.get('/movie/list', (req, res) => {
	return movieService.getMoviesList(req, res);
});

router.get('/movie/cinemaId', (req, res) => {
	return movieService.getMoviesByCinemaId(req, res);
});

/** Authentication Routes. */
router.get('/movie-details/:movieId', authMiddleware, (req, res) => {
	return movieService.getMovieById(req, res);
});

router.get('/movie/cinema/:cinemaId', (req, res) => {
	return movieService.getMovieByCinemaId(req, res);
});
module.exports = router;