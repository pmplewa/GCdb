require("babel-register");

var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var React = require("react");
var ReactDOM = require("react-dom/server");
var Router = require("react-router");
var swig  = require("swig");

var config = require("./config");
var routes = require("./app/routes");
var Star = require("./models/star");

var app = express();

mongoose.connect(config.database);
mongoose.connection.on("error", function() {
  console.info("ERROR: could not connect to MongoDB");
});

app.set("port", process.env.PORT || 3000);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

function isValid(param) {
  return !(param === undefined || param === "" || param ==="NaN")
}

// GET /api/stars/:id
app.get("/api/stars/:id", function(req, res, next) {
  var id = req.params.id;

  Star.findOne({ id: id }, function(err, star) {
    if (err) return next(err);
    if (!star) return res.status(404).send({ message: "Not Found" });

    return res.send(star);
  });
});

// GET /api/search
app.get("/api/search", function(req, res, next) {
  var name = req.query.name,
      x = req.query.x,
      y = req.query.y,
      r = req.query.r,
      orbit = req.query.orbit,
      pm = req.query.pm,
      limit = req.query.limit;

  var query = Star.find();

  if (isValid(name))
    query.find({ name: new RegExp(req.query.name, "i") });

  if (isValid(x) && isValid(y) && isValid(r))
    query.find({ position: { $geoWithin: { $center: [[+x, +y], +r] }}});

  if (isValid(orbit))
    if (orbit === "true") query.find({ orbit: { $gt: [] }});

  if (isValid(pm))
    if (pm === "true") query.find({ proper_motion: { $gt: [] }});

  var max_limit = 1000;
  if (isValid(limit))
    query.limit(Math.min(+limit, max_limit));
  else
    query.limit(max_limit);

  query.exec(function(err, stars) {
    if (err) return next(err);
    if (!stars) return res.status(404).send({ message: "Not found" });

    return res.send(stars);
  });
});

// GET /api/match
app.get("/api/match", function(req, res, next) {
  var x = req.query.x,
      y = req.query.y,
      r = req.query.r;

  if (x === undefined || x === "") return res.status(500).send({ message: "Invalid Parameter x" });
  if (y === undefined || y === "") return res.status(500).send({ message: "Invalid Parameter y" });
  if (r === undefined || r === "") return res.status(500).send({ message: "Invalid Parameter r" });

  Star.find({ position: { $geoWithin: { $center: [[x, y], r] }}}).exec(function(err, stars) {
    if (err) return next(err);

    return res.send(stars);
  });
});

// GET /api/stars/count
app.get("/api/count", function(req, res, next) {
  Star.count({}, function(err, count) {
    if (err) return next(err);

    return res.send({ count: count });
  });
});

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RouterContext, renderProps));
      var page = swig.renderFile("views/index.html", { html: html });
      res.status(200).send(page);
    } else {
      res.status(404).send("Not Found")
    }
  });
});

app.use(function(err, req, res, next) {
  console.log(err.stack.red);
  res.status(err.status || 500);
  res.send({ message: err.message });
});

app.listen(app.get("port"), function() {
  console.log("Listening (Port: " + app.get("port") + ")");
});
