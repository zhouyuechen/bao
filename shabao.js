const express = require("express");

var app = express();

app.listen(8080);

app.use(express.static(__dirname));