var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var authenticationRouter = require('./routes/authentication');
var userRouter = require('./routes/user.route');
var propertyRoute = require('./routes/property.route');
var uploadPhotoRoute = require('./routes/uploadImage.route')

const MongoDB = require('./services/mongodb.service');

MongoDB.connectToMongoDB();

var app = express();
app.use(cors());
app.use(express.json({limit:"10mb"}))
app.use(express.urlencoded({limit:"10mb"}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("*", require('./services/authentication.service').tokenVerification)
app.use('/', indexRouter);
app.use('/api', authenticationRouter);
app.use('/api/user', userRouter);
app.use('/api/property', propertyRoute);
app.use('/api/upload', uploadPhotoRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
