const dbConn = require('../utilities/dbConnection');
const ObjectId = require('mongodb').ObjectID;

exports.getMoviesList = function (req, res) {
    const collection = dbConn.getDb().collection('movies');
    collection.find({}).toArray()
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log(error);
        });
};

exports.getMovieById = function (req, res) {
    let cinemaId = req.params.cinemaId;
    const collection = dbConn.getDb().collection('movies');
    collection.findOne({ "_id": ObjectId(cinemaId) })
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log(error);
        });
};

exports.getMoviesByCinemaId = function (req, res) {
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