const express = require('express')
const request = require('request')
const app = express()
const bodyParser = require('body-parser')
const haltes = require('./app/haltes')
const vertrekken = require('./app/vertrekken')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs')
app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  console.log(req.query)
  if (req.query.halte_id && req.query.num_results) {
    haltes(req, res)
  } else {
    res.render('index', {})
  }
})
app.get('/navigatie', (req, res) => {
  res.render('navigatie')
})
app.get('/haltes', (req, res) => {
  haltes(req, res)
})
app.get('/map', (req, res) => {
  res.render('map', {});
});
app.get('/vertrekken', (req, res) => {
  vertrekken(req, res)
});
app.get('/info', (req, res) => {
  res.render('info', {});
});
app.listen(app.get('port'), function() {
  console.log('Node luistert op poort', app.get('port'));
});
