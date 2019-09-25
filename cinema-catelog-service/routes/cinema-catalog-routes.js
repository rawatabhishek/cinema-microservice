const express = require('express');
const router = express.Router();
const cinemaCatalogService = require('../services/cinema-catalog-service');

router.get('/cinema/list', (req, res) => {
	return cinemaCatalogService.getCinemas(req, res);
});

router.get('/cinema/:cityId', (req, res) => {
	return cinemaCatalogService.getCinemaByCity(req, res);
});

router.get('/cinema/details/:cinemaId', (req, res) => {
	return cinemaCatalogService.getCinemaById(req, res);
});

module.exports = router;