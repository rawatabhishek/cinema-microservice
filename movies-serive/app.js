const express = require('express');
const app = express();
const port = process.env.port || 3001;
app.get('/', (req, res) => {
    res.send('This is the movies micro-service');
});

app.listen(port, () => {
    console.log(`Movies Microservice is running on port ${port}`);
});