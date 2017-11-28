// convertData.js

module.exports.convert = function(arr) {
  var i = 0, result = [], arr;
  for (i = 0; i < arr.length; i++) {
    // console.log(i);
    // console.log(arr[5])
    var resultTemp = {}
    resultTemp.url = arr[i].link;
    resultTemp.snippet = arr[i].snippet;
    resultTemp["page_url"] = arr[i].image.contextLink;
    result.push(resultTemp);
  }
  return result;
}