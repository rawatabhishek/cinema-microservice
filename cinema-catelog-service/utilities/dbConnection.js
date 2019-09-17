const MongoClinet = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
let _db;

exports.connectToServer = function (callback) {
    console.log('Hello')
    const url = 'mongodb://localhost:27017';
    const database = 'cinema-microservice';
    const client = new MongoClinet(url, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(function (error) {
        console.log('Hello world in the db connections')
        if (error) {
            return callback(error);
        } else {
            _db = client.db('cinema-microservice');
            return callback(null);
        }
    });
}

exports.getDb = function () {
    return _db;
}

    // (async function () {
    //     const url = 'mongodb://localhost:27017';
    //     const database = 'cinema-microservice';
    //     const client = new MongoClinet(url, { useNewUrlParser: true, useUnifiedTopology: true });
    //     try {
    //         await client.connect();
    //         const db = client.db(database);
    //         return db;
    //     } catch (error) {
    //         console.log(error.stack);
    //     }
    //     client.close()
    // })();

