const express = require('express');
const app = express();
const port = process.env.port || 3000;
app.get('/', (req, res) => {
    res.send('This is the cinema catalog micro-service');
});

app.listen(port, () => {
    console.log(`Cinema Catalog Microservice is running on port ${port}`);
});