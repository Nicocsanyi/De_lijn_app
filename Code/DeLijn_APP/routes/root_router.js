var express = require("express");
var root = express.Router();

root.get('/', function(req, res) {
  res.render("index", {
       page_name: "index"
  });
});

// Route naar planroute
root.get('/planroute', function(req, res) {
  res.render("planroute", {
       page_name: "planroute"
  });
});

// Route naar home
root.get('/home', function(req, res) {
  res.render("home", {
       page_name: "home"
  });
});

// Route naar tickets
root.get('/tickets', function(req, res) {
  res.render("tickets", {
       page_name: "tickets"
  });
});

// Route naar haltes
root.get('/haltes', function(req, res) {
  res.render("haltes", {
       page_name: "haltes"
  });
});

// Route naar info
root.get('/info', function(req, res) {
  res.render("info", {
       page_name: "info"
  });
});

//verkooppunten
root.get('/result', function(req, res) {
  res.render("result", {
       page_name: "result"
  });
});


module.exports = root;
