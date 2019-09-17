const express = require('express');
const db = require('./utilities/dbConnection');
const ObjectId = require('mongodb').ObjectID;
const app = express();
const port = process.env.port || 3000;

// app.get('/', function(req, res){
//     db.collection('cinema-catalog').findOne({id:ObjectId('5d80c1062d89f21becab4f3b')}).then(response => {
//         console.log(response);
//     }).catch(error => {
//         console.log(error)
//     })
// })
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