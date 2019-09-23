require('dotenv').config();
const express = require('express');
const dbConnection = require('./utilities/dbConnection');
const app = express();
const port = process.env.port || 3010;
const movieRoutes = require('./routes/movie-routes');

app.use('/', movieRoutes);

/**
 * Connecting to mongodb database.
 * On successful database connection initializing the application.
 */
dbConnection.connectToServer(function (error) {
	if (error) {
		console.log(error)
	} else {
		app.listen(port, () => {
			console.log(`Movie microservice is running on port ${port}`);
		});
	}
});