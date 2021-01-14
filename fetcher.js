const args = process.argv.slice(2);

const fs = require('fs');

const request = require('request');

const fetchPageContents = function(url, callback) {
  // cannot return value: async function
  request('http://bugdiary.com/', (error, response, body) => {
    console.log('async done');
    callback(body);
  });
};

const saveResults = function(content) {
  // console.log(content);
  pageContent = { content };
  // console.log(pageContent);
};


fetchPageContents(args[0], saveResults);