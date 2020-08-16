var express = require("express");
// Requiring our models for syncing
var db = require("./models");

var PORT = process.env.PORT || 8080;

var app = express();

app.use(express.static("./Client/public"));

// Parse application body as JSON
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

require("./route/api-route.js")(app);

db.sequelize.sync({
  force: false
}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on http://localhost:" + PORT);
  });
});