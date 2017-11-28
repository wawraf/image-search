// fetchData.js

var request = require("request"), convert = require("./convertData.js");

module.exports = {
  search: function(term, start, callback) {
    request("https://www.googleapis.com/customsearch/v1?key=" + process.env.API_KEY + "&cx=" + process.env.CSE_ID + "&q=" + term + "&num=10" + "&start=" + start + "&searchType=image", function(error, res, body) {
      if (res.statusCode === 200) {
        callback(convert.convert(JSON.parse(body).items));
      } else {
        callback("Sorry! I can't make it now! Here's the status code from Google: " + res.statusCode + ".");
      }
    });
  }
}