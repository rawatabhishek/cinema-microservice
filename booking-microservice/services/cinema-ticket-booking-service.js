const ObjectId = require('mongodb').ObjectID;
const dbConn = require('../utilities/dbConnection');

exports.bookCinemaTickets = function (req, res) {
    const bookingType = process.env.MOVIE_TICKET_BOOKING;

    const collection = dbConn.getDb().collection('bookings');
    collection.find({}).toArray()
        .then(response => {
            return res.send(response);
        })
        .catch(error => {
            return res.status(400).send({ message: 'Error in cinema ticket booking.', error: error.message });
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
                movie_name: "$movie_details.name",
                ticket_price: 1
            }
        }
    ]).toArray()
        .then(response => {
            return res.send(response[0]);
        })
        .catch(error => {
            return res.status(400).send({ message: 'Error in cinema movie details.', error: error.message });
        });
};

exports.saveBookingDetails = function (req, res) {
    const bookingsDetails = req.body;
    const collection = dbConn.getDb().collection('bookings');
    collection.insertOne(bookingsDetails)
        .then(bookingResponse => {
            return res.send({
                status: 1,
                message: 'Booking has been saved successfully.'
            });
        })
        .catch(error => {
            return res.status(400).send({ message: 'Error in save booking details.', error: error.message });
        });
};