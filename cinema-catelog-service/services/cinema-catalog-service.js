const dbConn = require('../utilities/dbConnection');
const ObjectId = require('mongodb').ObjectID;

exports.getCinemaByCity = function (req, res) {
    let cityName = req.params.city;

    const collection = dbConn.getDb().collection('cinemas');
    collection.find({ "city": cityName }).toArray()
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