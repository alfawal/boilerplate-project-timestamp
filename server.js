// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {
  let { date } = req.params
  let resObj = {}

  if (parseInt(date).toString().length === 13) date = parseInt(date)
  
  resObj.unix = new Date(date).getTime()
  resObj.utc = new Date(date).toUTCString()

  if (isNaN(resObj.unix) | resObj.utc.includes('Invalid')) return res.json({ error : "Invalid Date" })
  
  return res.json(resObj);
});

app.get("/api", function (req, res) {
  let resObj = {}
  resObj.unix = new Date().getTime()
  resObj.utc = new Date().toUTCString()
  return res.json(resObj);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
