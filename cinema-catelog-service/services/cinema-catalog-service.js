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
            res.send(response);
        })
        .catch(error => {
            console.log(error);
        });
}