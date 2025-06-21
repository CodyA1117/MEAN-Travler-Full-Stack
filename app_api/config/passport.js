const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); // Require the user model we just created

passport.use(new LocalStrategy({
        usernameField: 'email' // Tell passport we are using email to login, not username
    },
    (username, password, done) => {
        User.findOne({ email: username })
            .then(user => {
                if (!user) {
                    return done(null, false, {
                        'message': 'Incorrect username.'
                    });
                }
                if (!user.validPassword(password)) {
                    return done(null, false, {
                        'message': 'Incorrect password.'
                    });
                }
                return done(null, user);
            })
            .catch(err => {
                return done(err);
            });
    }
));