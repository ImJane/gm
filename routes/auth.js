var express = require('express');
var router = express.Router();
var User = require('../models/User');



function errorMsg(res, msg, status){
	res.render('error', {
		message: msg,
		error: {
			status: status,
			stack: ''
		}
	})
}

/* GET home page. */
router.get('/login', function(req, res, next) {
	if(req.session.user){
		errorMsg(res, 606, '您已经登录!');
		return;
	}
  	res.render('login')
});


router.post('/login', function(req, res, next) {
	if(req.session.user){
		errorMsg(res, 606, '您已经登录!');
		return;
	}
  	if(!req.body.username){
  		errorMsg(res, 601, '用户名没有填写');
  		return;
  	}
  	if(!req.body.password){
  		errorMsg(res, 602, '密码没有填写');
  		return;
  	}
	User.findOne({
		username: req.body.username,
	}, (err, doc)=>{
		if(err) {
			errorMsg(res, 603, err);
	  		return;
		}
		if(!doc || !doc.username){
			var user = new User({
			    username: req.body.username,
			    password: req.body.password
			});
			user.save((err, updateUser)=>{
				if(err) {
					errorMsg(res, 604, err);
			  		return;
				}
				req.session.user = {
					username: req.body.username,
					id: doc.id
				}
			})
		}else{
			if(doc.password !== req.body.password){
				errorMsg(res, 605, '密码错误');
			}else{
				req.session.user = {
					username: req.body.username,
					id: doc.id
				}
				if(req.query.redirect){
					res.redirect(redirect);
				}else{
					res.redirect('/');
				}
			}
		}
	})
});

// 退出登录
router.post('/logout', function(req, res, next) {
	req.session.user = null;
	if(req.query.redirect){
		res.redirect(redirect);
	}else{
		res.redirect('/');
	}
})

module.exports = router; 
