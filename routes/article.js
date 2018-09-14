var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Article = require('../models/Article');

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

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('article', {
        data: {
            list: []
        }
    });
});

router.get('/add', function(req, res, next) {
    res.render('article-add', {
        data: {
            list: []
        }
    });
});

router.post('/add', function(req, res, next) {
    if(!res.session.user){
        errorMsg(res, 606, '您还未登录', true);
        return;
    }
    res.send({
        title: req.body.title
    })
    //res.redirect('/article/add')
});


module.exports = router; 