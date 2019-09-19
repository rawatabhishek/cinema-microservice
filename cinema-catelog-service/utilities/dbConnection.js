const MongoClinet = require('mongodb').MongoClient;
const database = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const url = `mongodb://${dbHost}:${dbPort}`;
let _db;

/**
 * Create connection to the mongodb database.
 * 
 * @returns callback
 */
exports.connectToServer = function (callback) {
    const client = new MongoClinet(url, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(function (error) {
        if (error) {
            return callback(error);
        } else {
            _db = client.db(database);
            return callback(null);
        }
    });
};

/**
 * Sends the database connection for global use.
 * 
 * @returns database connection object
 */
exports.getDb = function () {
    return _db;
};

