const MongoClinet = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

(async function () {
    const url = 'mongodb://localhost:27017';
    const database = 'cinema-microservice';
    const client = new MongoClinet(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db(database);
        db.collection('cinema-catelog').findOne({_id:ObjectId('5d80c1062d89f21becab4f3b')}).then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error)
        })
        return db;
    } catch (error) {
        console.log(error.stack);
    }
    client.close()
})();

