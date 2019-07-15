const {User} = require('../server/models/user');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

module.exports = (passport) => {
    // passport init setup
    // serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    // deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Login Local Strategy Implementation

    passport.use('local-login', new LocalStrategy( async (username, password, done) => {
        User.findOne({username: username}, async (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (! await user.validPassword(password)) {
                return done(null, false, {message: 'Incorrect Password'});
            }
            return done(null, user);
        })
    }));
}