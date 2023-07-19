// Create web server application    
var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// Create server
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port   
    console.log("Example app listening at http://%s:%s", host, port)
})

// Create route
app.get('/comments', function (req, res) {
    fs.readFile(__dirname + "/" + "comments.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})

app.get('/comments/:id', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "comments.json", 'utf8', function (err, data) {
        var comments = JSON.parse(data);
        var comment = comments["comment" + req.params.id]
        console.log(comment);
        res.end(JSON.stringify(comment));
    });
})

app.post('/comments', urlencodedParser, function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "comments.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data["comment" + req.body.id] = req.body;
        console.log(data);
        res.end(JSON.stringify(data));
    });
})

app.delete('/comments/:id', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "comments.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        delete data["comment" + req.params.id];
        console.log(data);
        res.end(JSON.stringify(data));
    });
})

app.put('/comments/:id', urlencodedParser, function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "comments.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data["comment" + req.params.id] = req.body;
        console.log(data);
        res.end(JSON.stringify(data));
    });
})

