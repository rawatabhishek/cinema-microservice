const ObjectId = require('mongodb').ObjectID;
const dbConn = require('../utilities/dbConnection');
const axios = require('axios');
const stripe = require('stripe')('sk_test_xLLZZYjlw18KVEazABHRotBS00FtqVE7qM');

exports.chargePayment = function (req, res) {
    const chargeToken = req.body.chargeToken;
    const chargeType = req.body.chargeType;
    const ticketPrice = req.body.ticketPrice;
    const selectedSeats = req.body.seats;
    const userDetails = JSON.parse(req.body.userDetails);
    const movieDetails = req.body.movieDetails;
    const showDateTime = req.body.showDateTime;


    const chargeAmount = ticketPrice * (selectedSeats.length);

    const chargeBody = {
        amount: chargeAmount,
        currency: process.env.CURRENCY,
        description: req.body.description,
        source: chargeToken
    }

    /* Charge the customer ticket amount using stripe. */
    stripe.charges.create(chargeBody)
        .then(chargeResponse => {
            const paymentDetailsBody = {
                username: userDetails.full_name,
                email: userDetails.email,
                userId: userDetails._id,
                chargeToken: chargeToken,
                chargeAmount: chargeAmount,
                paymentChargeResponse: chargeResponse,
                userDetails: userDetails,
                status: 'Success',
                chargeType: chargeType,
                movieDetails: movieDetails,
                createdDate: new Date()
            }

            /** Saving the charge response from the stripe in the payments table. */
            const collection = dbConn.getDb().collection('payments');
            collection.insertOne(paymentDetailsBody)
                .then(paymentInsertResponse => {
                    const bookingDetails = {
                        username: userDetails.full_name,
                        email: userDetails.email,
                        userId: userDetails._id,
                        chargeAmount: chargeAmount,
                        movieName: movieDetails.movie_name,
                        cinemaName: movieDetails.cinema_name,
                        cinemaAddress: movieDetails.cinema_address,
                        seats: selectedSeats,
                        showDateTime: showDateTime
                    };

                    /** Saving the booking details in the booking table using the booking microservice. */
                    const bookingEndPoint = `${process.env.BOOKING_MICROSERVICE}/save-booking-details`
                    axios.post(bookingEndPoint, bookingDetails)
                        .then(bookingResponse => {
                            return res.send({
                                status: 1,
                                message: 'Payment done successfully.'
                            });
                        })
                        .catch(bookingError => {
                            return res.status(400).send({ message: 'Error in saving booking details in the booking table.', error: bookingError.message });
                        });
                })
                .catch(paymentInsertError => {
                    return res.status(400).send({ message: 'Error in saving payment details in payments table.', error: paymentInsertError.message });
                });
        })
        .catch(error => {
            return res.status(400).send({ message: 'Error in creating charge from stripe.', error: error.message });
        });
};
