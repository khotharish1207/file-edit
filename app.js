var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");
var morgan = require("morgan");

var users = require("./routes/users");

var app = express();

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("combined"));

// app.use(express.static('public'))

app.use("/fs", users);

module.exports = app;
