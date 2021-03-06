var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
/*var mongoose = require('./config/mongoose.js');
var db = mongoose();*/
var session = require('express-session');
/*var mongoStore = require("connect-mongo")(session);*/
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next();
})
app.get('/get_info', function(req, res, next){
  res.send({
    token: 'super_admin'
  })
})
var history = require('connect-history-api-fallback');
app.use(history({
  htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 
 
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 使用 session 中间件
/*app.use(session({
  secret :  'secret', // 对session id 相关的cookie 进行签名
  resave : false,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie : {
      maxAge : 1000 * 60 * 30, // 设置 session 的有效时间，单位毫秒 
  },
  store: new mongoStore({
    mongooseConnection: db, 
    ttl: 7*24*60*60
  })
}));*/
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/dist')));

// 自动添加路由
/*var files = fs.readdirSync('./routes');
files.forEach((routeName)=>{
  var route = `./routes/${routeName}`;
  var routeModule = require(`./routes/${routeName}`);
  var stat = fs.statSync(route);
  if(stat.isFile() && /\.js$/.test(routeName)){
    var r = routeName.replace('.js', '');
    if(r === 'index'){
      r = '/';
    }
    app.use(`/${r}`, routeModule)
  }
})*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function(){ 
  console.log('webapp listener port 3000.');
})

module.exports = app;
