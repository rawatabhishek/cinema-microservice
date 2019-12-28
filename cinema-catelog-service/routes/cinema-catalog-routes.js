const express = require('express');
const router = express.Router();
const cinemaCatalogService = require('../services/cinema-catalog-service');
const authMiddleware = require('../middlewares/authMiddleware').authMiddleware;

router.get('/cinema/list', (req, res) => {
	return cinemaCatalogService.getCinemas(req, res);
});

router.get('/cinema/:cityId', (req, res) => {
	return cinemaCatalogService.getCinemaByCity(req, res);
});

router.get('/cinema/movie/:movieId', (req, res) => {
	return cinemaCatalogService.getCinemaByMovieId(req, res);
});

/** Authentication Routes. */
router.get('/cinema-details/:cinemaId', authMiddleware, (req, res) => {
	return cinemaCatalogService.getCinemaById(req, res);
});

module.exports = router;