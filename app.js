//1

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')

const mongoose = require("mongoose");
const generateData = require('./mongodb/generate-data');

mongoose.connect('mongodb+srv://m001-student:m001-mongodb-basics@sandbox.vmrom.mongodb.net/?retryWrites=true&w=majority');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
  
//   uncomment to re-generate data
//   generateData();
});

var indexRouter = require('./routes/index');
var recipesRouter = require('./routes/recipes');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/recipes', recipesRouter);

module.exports = app;
