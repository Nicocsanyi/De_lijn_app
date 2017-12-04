var express = require('express');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 5000));
app.get('/', function(req, res) {
    res.render('index', {
    });
});
app.post('/result', function(req, res) {
    var s_d = ' ';
    request('https://www.delijn.be/rise-api-core/locations/verkooppunten/' + req.body.stad, function (error, response, body) {
      var d = JSON.parse(body);
      console.log(d);
      if (d === null) {
        s_d += `
        <p> Geen verkooppunten ${req.body.stad}</p>
        `;
      }
      else {
        s_d += `
          <h2> Verkooppunten gemeente ${req.body.stad}</h2>
        `;
        for (var i = 0; i < d.length; i++) {
          var a = d[i];
          s_d += `
            <h2> ${a.gemeente} </h2>
            <h3> ${a.naam} verkoopt tickets </h3>
            <h5> Richting: ${a.adresString} </h5>
            <hr>
          `;
        }
      }
      res.render('result', {
        verkoop: `${s_d}`,
      });
    });
});
app.listen(app.get('port'), function () {
    console.log('Node luistert op poort', app.get('port'));
});
