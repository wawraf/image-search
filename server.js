// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var fetch = require("./app/fetchData.js");
var checkDB = require("./app/checkMongo.js");

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// get the most recent search queries from mongoDB at mLab
app.get("/recent", function (request, response) {
  checkDB.fetch(function(arr) {response.send(arr)});
});

// run app that uses googleapis.com and finds some images
app.get("/:term", function (request, response) {
  var term = request.params.term; //https://soft-glue.glitch.me/cat?some=ex&offset=5 returns params { term: 'cat' }
  var offset = request.query.offset; //https://soft-glue.glitch.me/cat?some=ex&offset=5 returns query { some: 'ex', offset: '5' }
  var start = 1;
  console.log("Term: " + term + ", Offset: " + offset);
  if (!offset) { start = 1 } else { start = offset * 10 - 9 };
  checkDB.update(term); // add new query to DB
  fetch.search(term, start, function(results) { response.send(results) }); // fetch data using googleapis.com
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});