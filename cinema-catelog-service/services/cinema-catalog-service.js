const dbConn = require('../utilities/dbConnection');

exports.getCinemaByCity = function (req, res) {
    const db = dbConn.getDb().collection('cinemas');
    collection.find({}).toArray().then(response => {
        console.log('Get cinema by cit');
        res.send('Get cinema by city');
    });

}