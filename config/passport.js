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

    passport.use('local-login', new LocalStrategy( async (username, password, done) => {
        await User.findOne({username: username}, (err, user) => {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, { message: 'Incorrect username.' });
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Wohh! Wrong password.'));
            else
                return done(null, user);
        })
        
    }))


}