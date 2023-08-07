let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let absolutePathViews = __dirname + '/views/index.html';
let absolutePathAssets = __dirname + '/public';
let response = { "message": "Hello json" };

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  let string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
})


app.get("/", (req, res) => {
  res.sendFile(absolutePathViews);
});


app.use("/public", express.static(absolutePathAssets))


app.get("/json", (req, res) => {
  if (process.env['MESSAGE_STYLE'] === "uppercase") {
    response = { "message": "HELLO JSON" };
    res.json(response)
  } else {
    res.json(response)
  }
})

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({ "time": req.time });
});

app.get('/:word/echo', function(req, res, next) {
  let word = req.params.word;
  res.json({ "echo": word })
});

app.get("/name", (req, res) => {
  res.json({ name: req.query.first + " " + req.query.last });
});

app.post("/name", (req, res) => {
  res.json({ name: `${req.body.first} ${req.body.last}` });
});




































module.exports = app;
