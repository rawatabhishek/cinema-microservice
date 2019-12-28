const ObjectId = require('mongodb').ObjectID;
const dbConn = require('../utilities/dbConnection');
const axios = require('axios');

exports.getCinemas = function (req, res) {
    const collection = dbConn.getDb().collection('cinemas');
    collection.find({}).toArray()
        .then(response => {
            return res.send(response);
        })
        .catch(error => {
            res.status(400).send({ message: 'Error in fetching cinemas list.', error: error.message });
        });
};

exports.getCinemaByCity = function (req, res) {
    let cityId = req.params.cityId;

    const collection = dbConn.getDb().collection('cinemas');
    collection.find({ "city_id": ObjectId(cityId) }).toArray()
        .then(response => {
            return res.send(response);
        })
        .catch(error => {
            res.status(400).send({ message: 'Error in fetching cinemas list on basis of city.', error: error.message });
        });
};

exports.getCinemaByMovieId = function (req, res) {
    let movieId = req.params.movieId;

    const collection = dbConn.getDb().collection('cinema-movie-catalog');
    collection.aggregate([
        { $match: { movie_id: ObjectId(movieId) } },
        {
            $lookup: {
                from: 'cinemas',
                localField: 'cinema_id',
                foreignField: '_id',
                as: 'cinema_details'
            }
        },
        { 
            $unwind: "$cinema_details"
        },
        {
            $project: { 
                _id: 1,
                cinema_id: 1,
                movie_id: 1,
                currently_showing: 1,
                ticket_price: 1,
                showtime: 1,
                name: "$cinema_details.name",
                address: "$cinema_details.address",
                slug: "$cinema_details.address",
                city_id: "$cinema_details.address"
            }
        }
    ]).toArray()
        .then(response => {
            return res.send(response);
        })
        .catch(error => {
            res.status(400).send({ message: 'Error in fetching cinemas list on basis of movie id.', error: error.message });
        });
};

exports.getCinemaById = function (req, res) {
    let cinemaId = req.params.cinemaId;
    const collection = dbConn.getDb().collection('cinemas');
    collection.findOne({ "_id": ObjectId(cinemaId) })
        .then(response => {
            // Get the movie list in which this cinema.
            let movieDetailsUrl = `${process.env.MOVIE_MICROSERVICE}/movie/cinema/${cinemaId}`;
            return axios.get(movieDetailsUrl)
                .then(movieDetails => {
                    response['featuring-movie'] = movieDetails.data;
                    return res.send(response);
                })
                .catch(error => {
                    return res.status(400).send({ message: 'Error in getting movie list', error: error.message });
                });
        })
        .catch(error => {
            res.status(400).send({ message: 'Error in fetching cinemas by Id.', error: error.message });
        });
};