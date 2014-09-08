var express = require('express');
var router = express.Router();
var passport = require('passport');

/* Redirect home page to login */
router.get('/', function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/profile');
    } else {
        res.redirect('/login');
    }
});

/* GET login */
router.get('/login', function(req, res) {
  res.render('index', { title: 'Node Login Example w/ Passport' });
});

/* POST login */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
    badRequestMessage: 'You must specify an email address and password'
}));

/* GET register */
router.get('/register', function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/profile');
    } else {
        res.render('register');
    }
});

/* POST register */
router.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/register',
    failureFlash: true,
    badRequestMessage: 'You must specify an email address and password'
}));

/* GET profile */
router.get('/profile', function(req, res, next) {
    if (!req.isAuthenticated()) return next(new Error(401));
    res.render('profile', {
        user: req.user
    });
});

/* GET logout */
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

module.exports = router;
