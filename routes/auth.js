var express = require('express');
var router = express.Router();
var User = require('../models/User');
var bcrypt = require('bcrypt');

function errorMsg(res, status, msg, send){
	if(send){
		res.send({
			status: status,
			error: msg
		})
	}else{
		res.render('error', {
			message: msg,
			error: {
				status: status,
				stack: ''
			}
		})
	}
}

/* GET home page. */
router.get('/login', function(req, res, next) {
	if(req.session.user){
		res.redirect('/');
		return;
	}
  	res.render('login')
});


router.post('/login', function(req, res, next) {
	if(req.session.user){
		errorMsg(res, 606, '您已经登录!', true);
		return;
	}
  	if(!req.body.username){
  		errorMsg(res, 601, '用户名没有填写', true);
  		return;
  	}
  	if(!req.body.password){
  		errorMsg(res, 602, '密码没有填写', true);
  		return;
  	}
	User.findOne({
		username: req.body.username,
	}, (err, doc)=>{
		if(err) {
			errorMsg(res, 603, err, true);
	  		return;
		}
		if(!doc || !doc.username){
		    var saltRounds = 10;
		    var salt = bcrypt.genSaltSync(saltRounds);
		    var hash = bcrypt.hashSync(req.body.password, salt);
			var user = new User({
			    username: req.body.username,
			    password: hash
			});
			user.save((err, updateUser)=>{
				if(err) {
					errorMsg(res, 604, err, true);
			  		return;
				}
				req.session.user = {
					username: req.body.username,
					id: doc.id
				}
				if(req.query.redirect){
					res.send({
						status: 0,
						data: {
							url: req.query.redirect
						}
					});
				}else{
					res.send({
						status: 0,
						data: {
							url: '/'
						}
					});
				}
			})
		}else{
			var pwdMatchFlag = bcrypt.compareSync(req.body.password, doc.password);
			if(!pwdMatchFlag){
				errorMsg(res, 605, '密码错误', true);
			}else{
				req.session.user = {
					username: req.body.username,
					id: doc.id
				}
				if(req.query.redirect){
					res.send({
						status: 0,
						data: {
							url: req.query.redirect
						}
					});
				}else{
					res.send({
						status: 0,
						data: {
							url: '/'
						}
					});
				}
			}
		}
	})
});

// 退出登录
router.get('/logout', function(req, res, next) {
	req.session.user = null;
	if(req.query.redirect){
		res.redirect(redirect);
	}else{
		res.redirect('/auth/login');
	}
})

module.exports = router; 
