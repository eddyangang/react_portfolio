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
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

require("./route/api-route.js")(app);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./Client/public/index.html"));
});


db.sequelize.sync({
  force: false
}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on http://localhost:" + PORT);
  });
});