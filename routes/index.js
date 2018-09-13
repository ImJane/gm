var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
	if(!req.session.user){
		res.redirect('/auth/login')
		return;
	}
  	res.render('index', {
  		user: req.session.user
  	})
});

module.exports = router; 
