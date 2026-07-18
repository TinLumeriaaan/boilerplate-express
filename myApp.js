require('dotenv').config();
let bodyParser = require('body-parser');
let express = require('express');
let app = express();

console.log("Hello World");

app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function(req, res) {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({"message": "HELLO JSON"});
  } else {
    res.json({"message": "Hello json"});
  }
});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.send({ time: req.time });
});

app.get('/:word/echo', function(req, res) {
  let word = req.params.word;
  res.json({ echo: word });
});

app.get('/name', function(req, res) {
  let firstName = req.query.first;
  let lastName = req.query.last;
  res.json({ name: firstName + " " + lastName });
});


app.post('/name', function(req, res) {
  let firstName = req.body.first;
  let lastName = req.body.last;
  res.json({ name: firstName + " " + lastName });
});





























 module.exports = app;
