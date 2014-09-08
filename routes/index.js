var express = require('express');
var router = express.Router();
var passport = require('passport');

/* Redirect home page to login */
router.get('/', function(req, res) {
    res.redirect('/login');
});

/* GET login */
router.get('/login', function(req, res) {
  res.render('index', { title: 'Node Login Example w/ Passport' });
});

/* POST login */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    badRequestMessage: 'You must specify an email address and password'
}));

module.exports = router;
