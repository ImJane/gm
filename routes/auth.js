var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET home page. */
router.get('/login', function(req, res, next) {
  	res.render('login')
});

router.post('/login', function(req, res, next) {
  	if(!req.body.username){
  		res.render('error', {
  			message: '用户名没有填写',
  			error: {
  				status: 7500,
  				stack: ''
  			}
  		})
  		return;
  	}
  	if(!req.body.password){
  		res.render('error', {
  			message: '密码没有填写',
  			error: {
  				status: 7500,
  				stack: ''
  			}
  		})
  		return;
  	}
	User.findOne({
		username: req.body.username,
	}, (err, doc)=>{
		if(err) {
			res.render('error', {
	  			message: err,
	  			error: {
	  				status: 7500,
	  				stack: ''
	  			}
	  		})
	  		return;
		}
		if(!doc || !doc.username){
			var user = new User({
			    username: req.body.username,
			    password: req.body.password
			});
			user.save((err, updateUser)=>{
				if(err) {
					res.render('error', {
			  			message: err,
			  			error: {
			  				status: 7500,
			  				stack: ''
			  			}
			  		})
			  		return;
				}
				res.send({
					doc: updateUser
				});
			})
		}else{
			if(doc.password !== req.body.password){
				res.render('error', {
		  			message: '密码错误',
		  			error: {
		  				status: 7500,
		  				stack: ''
		  			}
		  		})
			}else{
				res.redirect('/');
			}
		}
	})
});

module.exports = router; 
