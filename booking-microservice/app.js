require('dotenv').config();
const express = require('express');
const dbConnection = require('./utilities/dbConnection');
const cors = require('cors');
const app = express();
const port = process.env.port || 3030;
const ticketBookingRoutes = require('./routes/ticket-booking-routes');

app.use(cors());
app.use('/', ticketBookingRoutes);

/**
 * Connecting to mongodb database.
 * On successful database connection initializing the application.
 */
dbConnection.connectToServer(function (error) {
	if (error) {
		console.log(error)
	} else {
		app.listen(port, () => {
			console.log(`Booking microservice is running on port ${port}`);
		});
	}
});