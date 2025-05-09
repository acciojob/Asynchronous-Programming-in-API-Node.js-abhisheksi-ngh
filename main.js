const fs = require('fs');
const http = require('http');
const axios = require('axios');

const apiUrl = 'https://jsonplaceholder.typicode.com/todos/1';

// Function to fetch data from API
function fetchFromAPI(url) {
  return axios.get(url).then(response => response.data);
}

// Function to save data to file
function saveToFile(filePath, data) {
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("Data saved to file:", filePath);
    }
  });
}

// Exports fetch function for testing or reuse
module.exports = function fetchAndSave(url, filePath) {
  fetchFromAPI(url)
    .then(data => saveToFile(filePath, data))
    .catch(error => console.error("Failed to fetch and save:", error));
};

// Get command-line arguments
const args = process.argv.slice(2); // [url, filepath]
const url = args[0] || apiUrl;
const filePath = args[1] || 'output.json';

// Call the function
require('./main.js')(url, filePath);

// Create a basic HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, world!');
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
