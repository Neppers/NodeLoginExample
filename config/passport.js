var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {

        //1. Check if a user with that email already exists
        User.findOne({'local.email': email}, function(err, user) {
            //2. If any errors in database lookup -> throw error    
            if (err) return done(err);
            //3. If password/confirm password do not match -> throw error
            if (password !== req.body.confirmPassword)
                return done(null, false, { message: 'Passwords do not match' });
            if (user) {
                //4. If user already exists -> throw error
                return done(null, false, { message: 'Email address is already in use' });
            } else {
                //5. If no errors, create a new user
                var newUser = new User();
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.save(function(err) {
                    if (err) throw err;
                    return done(null, newUser);
                });
            }
        });        
    }));
    
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        
        /*
        1. Check if user with that email already exists
        2. If any errors in database -> throw error
        3. If password is not correct or use does not exist -> throw error
        4. If no errors, log user in
         */
        
    }));
};