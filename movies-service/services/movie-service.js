const dbConn = require('../utilities/dbConnection');
const ObjectId = require('mongodb').ObjectID;

exports.getMovieById = function (req, res) {
    let cinemaId = req.params.cinemaId;

    const collection = dbConn.getDb().collection('movies');
    collection.find({ "_id": ObjectId(cinemaId) })
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