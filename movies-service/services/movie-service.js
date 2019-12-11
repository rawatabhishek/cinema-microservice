const dbConn = require('../utilities/dbConnection');
const ObjectId = require('mongodb').ObjectID;
const axios = require('axios');

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
    let movieId = req.params.movieId;
    const collection = dbConn.getDb().collection('movies');
    collection.findOne({ "_id": ObjectId(movieId) })
        .then(response => {
            // Get the cinemas list in which this movie is running.
            let cinemaDetailsUrl = `${process.env.CINEMA_CATALOG_MICROSERVICE}/cinema/movie/${movieId}`;
            return axios.get(cinemaDetailsUrl)
                .then(cinemaDetails => {
                    response['featuring-cinemas'] = cinemaDetails.data;
                    res.send(response);
                })
                .catch(error => {
                    res.status(400).send({ message: 'Error in getting cinema list', error: error.message });
                });
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