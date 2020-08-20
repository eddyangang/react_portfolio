var express = require("express");
// Requiring our models for syncing
var db = require("./models");
const path = require("path");
var PORT = process.env.PORT || 8080;

var app = express();
// Parse application body as JSON
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static("./Client/public"));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./Client/public/index.html"));
});

require("./route/api-route.js")(app);

db.sequelize.sync({
  force: false
}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on http://localhost:" + PORT);
  });
});