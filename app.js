/**  
  Author :l30
  Date: 7/25/2014
  Purpose: Radio Indigo Songs Extraction Script 

*/

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');


var url = "http://www.indigo919.in";

console.log('*********************************\r\n')
console.log('Indigo 91.9 Songs Extractor\r\n');
console.log('Author: l30 \r\n');
console.log('*********************************\r\n')

console.log('Fetching content from url....\r\n');

request({
  "uri": url
}, function(err, resp, body) {

  if (!err) {

    console.log('Analysing content Dump....\r\n');
    var Songs_matches = body.match(/&quot;(.+?)&quot/g);
    var artist_matches = body.match(/<br \/><strong>(.+?)<\/strong><br \/><br \/>/g);

    var Songs = [],
      artist = [];

    // Skip 1st 3 values, contains unwanted data
    for (i = 3; i < Songs_matches.length; i++) {
      Songs[i - 3] = Songs_matches[i].replace('&quot;', '').replace('&quot', '').replace('\'', '').trim();
      artist[i - 3] = artist_matches[i - 3].replace('<br \/><strong>', '').replace('<\/strong><br \/><br \/>', '').trim();


    }

    var stream = fs.createWriteStream("Songs.txt");
    stream.once('open', function(fd) {
      for (var i = 0; i < Songs.length; i++) {
        stream.write(artist[i] + ' ' + Songs[i] + "\r\n");
      };

      stream.end();
      console.log('Successfully dumped...Checkout Songs.txt file \r\n');
    });


  }
});