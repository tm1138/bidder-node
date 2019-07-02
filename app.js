var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var customer = require('./routes/routes-customer');
var generate_uid = require('./routes/generate_uid');


let reporter = function (type, ...rest)
{
    //remote reported logic goes here..
}

/* handle an uncaught exception & exit the process */
process.on('uncaughtException', function(err)
{
    console.log((new Date).toUTCString() + ' uncaughtException ', err.message);
    console.log(err.stack);

    reporter("uncaughtException", (new Date).toUTCString(), err.message, err.stack);

    process.exit(1);
});

/* handle an unhandled promise rejection */
process.on('unhandledRejection', function (reason, promise)
{
	console.error('unhandled rejection:', reason.message || reason);

	reporter("uncaughtException", (new Date).toUTCString(), reason.message || reason);
})



var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/customer', customer);
app.use('/api/v1/generate_uid', generate_uid);


//to enable cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
//cors bypass code end



module.exports = app;
