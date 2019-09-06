const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.get('/cinema/:city', (req, res) => {
    let city = req.params.city;
    res.send(city);
});

app.get('/cinema/details/:cinemaId', (req, res) => {
    let cinemaId = req.params.cinemaId;
    res.send(cinemaId);
});

app.listen(port, () => {
    console.log(`Cinema Catalog Microservice is running on port ${port}`);
});