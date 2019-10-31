const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const ObjectId = require('mongodb').ObjectID;
const dbConn = require('../utilities/dbConnection');

passport.use(new LocalStrategy((username, password, done) => {
    const collection = dbConn.getDb().collection('authentication');
    collection.findOne({ email: username, password: password }, { projection: { password: 0 } })
        .then(response => {
            if (!response) {
                return done(null, false, { errorMessage: 'Username or password is invalid' });
            }
            return done(null, response, null);
        })
        .catch(error => {
            done(error, null, null);
        });
}));