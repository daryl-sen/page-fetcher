// commandline arguments
const args = process.argv.slice(2);

// imports
const fs = require('fs');
const request = require('request');
const readline = require('readline');

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

    // check if file exists
    if (fs.existsSync(fileName)) {
      console.log('file exists, replaced it');
    } else {
      const fileSize = fs.statSync(fileName).size;
      console.log(`Downloaded and saved ${fileSize} bytes to ${fileName}`);
    }
  });
};

fetchPageContents(args[0], writeToFile, args[1]);