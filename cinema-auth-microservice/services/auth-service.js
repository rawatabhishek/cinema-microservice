const ObjectId = require('mongodb').ObjectID;
const dbConn = require('../utilities/dbConnection');

exports.authenticate = function (req, res) {    
    const collection = dbConn.getDb().collection('auth');
    // collection.find({}).toArray()
    //     .then(response => {
    //         res.send(response);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });
};
