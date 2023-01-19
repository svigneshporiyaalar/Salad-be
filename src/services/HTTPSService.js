const request = require('request');

const requestAPI = async (options) => new Promise((resolve, reject) => {
  request(options, (error, response, body) => {
    if (error) {
      reject(error);
    }
    resolve({ response, body });
  });
});

module.exports = requestAPI;
