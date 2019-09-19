require('dotenv').config();
const express = require('express');
const dbConnection = require('./utilities/dbConnection');
const app = express();
const port = process.env.port || 3000;
const cinemaCatalogRoutes = require('./routes/cinema-catalog-routes');
app.use('/',cinemaCatalogRoutes);

/**
 * Connecting to mongodb database.
 * On successful database connection initializing the application.
 */
dbConnection.connectToServer(function (error) {
	if (error) {
		console.log(error)
	} else {
		app.listen(port, () => {
			console.log(`Cinema catalog microservice is running on port ${port}`);
		});
	}

});