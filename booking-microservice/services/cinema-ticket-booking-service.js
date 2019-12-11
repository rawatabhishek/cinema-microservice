const ObjectId = require('mongodb').ObjectID;
const dbConn = require('../utilities/dbConnection');

exports.bookCinemaTickets = function (req, res) {
    const bookingType = process.env.MOVIE_TICKET_BOOKING;

    const collection = dbConn.getDb().collection('bookings');
    collection.find({}).toArray()
        .then(response => {
            res.send(response);
        })
        .catch(error => {
            console.log(error);
        });
};

exports.getCinemaMovieDetails = function (req, res) {
    let cinemaMovieId = req.params.id;
    const collection = dbConn.getDb().collection('cinema-movie-catalog');
    collection.aggregate([
        { $match: { _id: ObjectId(cinemaMovieId) } },
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
                cinema_name: "$cinema_details.name",
                cinema_address: "$cinema_details.address",
                movie_name: "$movie_details.name"
            }
        }
    ]).toArray()
        .then(response => {
            res.send(response[0]);
        })
        .catch(error => {
            console.log(error);
        });
}