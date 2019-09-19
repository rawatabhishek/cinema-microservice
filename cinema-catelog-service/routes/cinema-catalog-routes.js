const express = require('express');
const router = express.Router();
const cinemaCatalogService = require('../services/cinema-catalog-service');

router.get('/cinema/:city', (req, res) => {
	return cinemaCatalogService.getCinemaByCity(req, res);
});

router.get('/cinema/details/:cinemaId', (req, res) => {
	return cinemaCatalogService.getCinemaById(req, res);
});

module.exports = router;