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
    if(!req.session.user){
        res.redirect('/auth/login')
        return;
    }
    Article.find({})
        .limit(20)
        .populate({ path: 'author', select: { username: 1 } })
        .exec((err, docs)=>{
            let docsRes = [];
            docs.forEach((doc, i)=>{
                let createTime = new Date(doc.created_time)
                let doc2 = doc.toJSON();
                docsRes[i] = doc2;
                docsRes[i].author = doc.author.username
                docsRes[i].created_time = `${createTime.getFullYear()}-${createTime.getMonth()+1}-${createTime.getDate()}` 
            })
            res.render('article', { 
                data: {
                    list: docsRes
                }
            });
        }) 
});

router.get('/add', function(req, res, next) {
    if(!req.session.user){
        errorMsg(res, 606, '您还未登录', true);
        return;
    }
    if(req.query.edit){
        Article.findById(req.query.edit).exec((err, doc)=>{
            res.render('article-add', {
                title: doc.title,
                content: doc.content
            });
        })
    }else{
        res.render('article-add', {
            title: '',
            content: ''
        });
    }
    
});

router.post('/add', function(req, res, next) {
    if(!req.session.user){
        errorMsg(res, 606, '您还未登录', true);
        return;
    }
    let article = new Article({
        title: req.body.title,
        content: req.body.content,
        author: req.session.user.id
    })

    article.save((err, doc)=>{
        res.send({
            status: 0,
            data: {
                url: '/article'
            }
        })
    })
});


module.exports = router; 