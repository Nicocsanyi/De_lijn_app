var express = require("express");
var path = require("path");
var app = express();

//data uit json files halen
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.set('port', (process.env.PORT || 5000));
app.use(express.static('public'));

app.use(require("./routes/root_router"));

app.get('/verkooppunten', function(req, res) {
    res.render('verkooppunten', {
    });
});

app.post('/result', function(req, res) {
    // console.log(req.body.stad);
    var s_d = ' ';
    request('https://www.delijn.be/rise-api-core/locations/verkooppunten/' + req.body.stad, function (error, response, body) {
      var d = JSON.parse(body);
      console.log(d);

      if (d === null) {
        s_d += `
        <p> Er zijn geen verkooppunten gevonden in de gemeente ${req.body.stad}</p>
        `;
      }
      else {

        s_d += `
          <h2> verkooppunten in de gemeente ${req.body.stad}</h2>
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

app.listen(app.get('port'), function() {
  console.log('Node luistert op poort', app.get('port'));
});
