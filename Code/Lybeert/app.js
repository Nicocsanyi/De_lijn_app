var express = require("express");
var path = require("path");
var app = express();

//data uit json files halen
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.set('port', (process.env.PORT || 5000));
app.use(express.static('public'));

app.use(require("./routes/root_router"));

app.listen(app.get('port'), function() {
  console.log('Node luistert op poort', app.get('port'));
});
