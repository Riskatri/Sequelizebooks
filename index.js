var express = require("express");

var app = express();


app.use(express.json());

require("./routes/books.js")(app);

var server = app.listen(4920, "127.0.0.1", function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("App listening at http://%s:%s", host, port);
    });