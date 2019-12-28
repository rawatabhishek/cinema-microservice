require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.port || 3050;
const notificationRoutes = require('./routes/notification-routes');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use('/', notificationRoutes);

app.listen(port, () => {
    console.log(`Notification microservice is running on port ${port}`);
});