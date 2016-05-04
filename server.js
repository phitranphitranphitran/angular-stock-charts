var express = require("express");
var path = require("path");

var app = express();

app.use(express.static(path.join(__dirname, "public/")));

var PORT = process.env.PORT || 3000;
app.set("port", PORT);

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, function() {
  console.log("Express server started on port", PORT);
});
