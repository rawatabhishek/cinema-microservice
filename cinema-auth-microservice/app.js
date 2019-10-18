require('dotenv').config();
const express = require('express');
const dbConnection = require('./utilities/dbConnection');
const cors = require('cors');
const app = express();
const port = process.env.port || 3020;
const authRoutes = require('./routes/auth-route');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
// require('./strategy/localStrategy');
app.use('/', authRoutes);

/**
 * Connecting to mongodb database.
 * On successful database connection initializing the application.
 */
dbConnection.connectToServer(function (error) {
	if (error) {
		console.log(error)
	} else {
		app.listen(port, () => {
			console.log(`Cinema auth microservice is running on port ${port}`);
		});
	}
});