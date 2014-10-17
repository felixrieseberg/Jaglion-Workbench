var express         = require('express'),
    exphbs          = require('express-handlebars'),
    path            = require('path'),
    favicon         = require('serve-favicon'),
    logger          = require('morgan'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),
    request         = require('request'),
    debug           = require('debug')('Jaglion'),
    
    config          = require('./config'),
    api             = require('./api');

var app = express(), errorHandlers;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static(__dirname + '/clientdist'));
app.use('/api', api);

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});

module.exports = app;
