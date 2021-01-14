// commandline arguments
const args = process.argv.slice(2);

// imports
const fs = require('fs');
const request = require('request');

// fetch the page, call writeToFile to save the contents
const fetchPageContents = function(url, callback, fileName) {
  request(url, (error, response, body) => {
    callback(body, fileName);
  });
};

const writeToFile = function(content, fileName) {
  fs.writeFile(fileName, content, function(err) {
    if (err) {
      throw err;
    }
    const fileSize = fs.statSync(fileName).size;
    console.log(`Downloaded and saved ${fileSize} bytes to ${fileName}`);
  });
};

fetchPageContents(args[0], writeToFile, args[1]);