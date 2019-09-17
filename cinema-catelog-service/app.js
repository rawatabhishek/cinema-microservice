const express = require('express');
const db = require('./utilities/dbConnection');
const ObjectId = require('mongodb').ObjectID;
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

db.connectToServer(function (error) {
    if (error) {
        console.log(error)
    } else {
        const dbNew = db.getDb();
        app.get('/', function(req, res){
            dbNew.collection('cinemas').find({}).toArray().then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error)
            })
        })
        app.listen(port, () => {
            console.log(`Cinema Catalog Microservice is running on port ${port}`);
        });
    }
    
});