require('dotenv').config();
const express = require('express');
const dbConnection = require('./utilities/dbConnection');
const cors = require('cors');
const app = express();
const port = process.env.port || 3040;
const paymentRoutes = require('./routes/payment-routes');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use('/', paymentRoutes);

/**
 * Connecting to mongodb database.
 * On successful database connection initializing the application.
 */
dbConnection.connectToServer(function (error) {
	if (error) {
		console.log(error)
	} else {
		app.listen(port, () => {
			console.log(`Payment microservice is running on port ${port}`);
		});
	}
});