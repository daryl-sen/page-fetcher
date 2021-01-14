// commandline arguments
const args = process.argv.slice(2);

// imports
const fs = require('fs');
const request = require('request');
const readline = require('readline');

// fetch the page, call writeToFile to save the contents
const fetchPageContents = function(url, callback, fileName) {
  request(url, (error, response, body) => {
    if (response.statusCode !== 200) {
      return console.log('Page not found. Operation cancelled');
    }

    // check if file exists
    if (fs.existsSync(fileName)) {
      // readline setup
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      rl.question('File exists, replace it?', (answer) => {
        rl.close();
        if (answer === 'Y') {
          return callback(body, fileName);
        }
        return console.log('Operation cancelled');
      });
    } else {
      callback(body, fileName);
    }
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