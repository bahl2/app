var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*------------------------------------------
    conexão para acesso banco ao mySQL SERVIDOR DO
	
	INFOS:
	
	SERVIDOR
	
	Usuario terminal root 
	senha root	
	Databe  name  ranking
-------------------------------------------*/
var connection = require('express-myconnection');
var mysql = require('mysql');

app.use(
    connection(mysql, {
        host: 'localhost', //servidor do banco mysql, se for local: localhost,
        user: 'aoa', //usuário com permissão de conexão à base de dados
        password: 'root', //senha de acesso ao banco
        port: 3306, //porta do mysql, normalmente 3306
        database: 'aoa' //nome da base de dados (esquema)
    }, 'pool')

);

/*------------------------------------------
    conexão para acesso banco ao mySQL  USANDO MYSQL 000WEBHOST
-------------------------------------------
var connection  = require('express-myconnection'); 
var mysql = require('mysql');

app.use(
    connection(mysql,{
        host: '69.175.101.34', //servidor do banco mysql, se for local: localhost,
        user: 'id3846836_root', //usuário com permissão de conexão à base de dados
        password : 'root456852;', //senha de acesso ao banco
        port : 3306, //porta do mysql, normalmente 3306
        database:'id3846836_root' //nome da base de dados (esquema)
    },'pool')

);*/

/*------------------------------------------
    conexão para acesso banco ao mySQL  GREEN
-------------------------------------------
var connection  = require('express-myconnection'); 
var mysql = require('mysql');

app.use(
    connection(mysql,{
        host: '69.175.101.34', //servidor do banco mysql, se for local: localhost,
        user: 'bdmysql', //usuário com permissão de conexão à base de dados
        password : 'gM4mq,N-ZMV;', //senha de acesso ao banco
        port : 3306, //porta do mysql, normalmente 3306
        database:'bdmysql' //nome da base de dados (esquema)
    },'pool')

);*/
//-------------------------------------------
/*------------------------------------------
     acesso ao serviço de clientes
-------------------------------------------*/
var ranking = require('./routes/ranking');
app.use('/ranking', ranking);
//-------------------------------------------

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

module.exports = app;