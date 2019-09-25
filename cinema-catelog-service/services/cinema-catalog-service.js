const ObjectId = require('mongodb').ObjectID;
const dbConn = require('../utilities/dbConnection');

exports.getCinemas = function (req, res) {    
    const collection = dbConn.getDb().collection('cinemas');
    collection.find({}).toArray()
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log(error);
        });
};

exports.getCinemaByCity = function (req, res) {
    let cityId = req.params.cityId;

    const collection = dbConn.getDb().collection('cinemas');
    collection.find({ "city_id": ObjectId(cityId) }).toArray()
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log(error);
        });
};

exports.getCinemaById = function (req, res) {
    let cinemaId = req.params.cinemaId;

    const collection = dbConn.getDb().collection('cinemas');
    collection.findOne({ "_id": ObjectId(cinemaId) })
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log(error);
        });
}