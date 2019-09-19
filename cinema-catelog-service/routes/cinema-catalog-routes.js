const express = require('express');
const router = express.Router();
const cinemaCatalogService = require('../services/cinema-catalog-service');

router.get('/cinema/:city', (req, res) => {
	return cinemaCatalogService.getCinemaByCity(req, res);
});

// app.get('/cinema/details/:cinemaId', (req, res) => {
// 	let cinemaId = req.params.cinemaId;
// 	res.send(cinemaId);
// });

module.exports = router;

// exports.cinemaCatalogRoutes = function(app, db) {
//     app.get('/', () => {
//         console.log('Hello world!');
//     })
// } 