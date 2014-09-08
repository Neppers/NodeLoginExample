var express = require('express');
var router = express.Router();

/* Redirect home page to login */
router.get('/', function(req, res) {
    res.redirect('/login');
});

/* GET home page. */
router.get('/login', function(req, res) {
  res.render('index', { title: 'Node Login Example w/ Passport' });
});

module.exports = router;
