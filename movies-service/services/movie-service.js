const dbConn = require('../utilities/dbConnection');
const ObjectId = require('mongodb').ObjectID;
const axios = require('axios');

exports.getMoviesList = function (req, res) {
    const collection = dbConn.getDb().collection('movies');
    collection.find({}).toArray()
        .then(response => {
            return res.send(response);
        })
        .catch(error => {
            return res.status(400).send({ message: 'Error in fetching movie list.', error: error.message });
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
                    return res.send(response);
                })
                .catch(error => {
                    return res.status(400).send({ message: 'Error in getting cinema list', error: error.message });
                });
        })
        .catch(error => {
            return res.status(400).send({ message: 'Error in fetching movie by movie id.', error: error.message });
        });
};

exports.getMoviesByCinemaId = function (req, res) {
    let cinemaId = req.params.cinemaId;

    const collection = dbConn.getDb().collection('cinemas');
    collection.findOne({ "_id": ObjectId(cinemaId) })
        .then(response => {
            return res.send(response);
        })
        .catch(error => {
            return res.status(400).send({ message: 'Error in fetching movie list by cinema id.', error: error.message });
        });
};

exports.getMovieByCinemaId = function (req, res) {
    let cinemaId = req.params.cinemaId;

    const collection = dbConn.getDb().collection('cinema-movie-catalog');
    collection.aggregate([
        { $match: { cinema_id: ObjectId(cinemaId) } },
        {
            $lookup: {
                from: 'movies',
                localField: 'movie_id',
                foreignField: '_id',
                as: 'movie_details'
            }
        },
        { 
            $unwind: "$movie_details"
        },
        {
            $project: { 
                _id: 1,
                cinema_id: 1,
                movie_id: 1,
                currently_showing: 1,
                ticket_price: 1,
                showtime: 1,
                name: "$movie_details.name",
                language: "$movie_details.language",
                releaseDate: "$movie_details.releaseDate",
                screenTime: "$movie_details.screenTime",
                summary: "$movie_details.summary"
            }
        }
    ]).toArray()
        .then(response => {
            return res.send(response);
        })
        .catch(error => {
            return res.status(400).send({ message: 'Error in fetching movie list by cinema id.', error: error.message });
        });
};