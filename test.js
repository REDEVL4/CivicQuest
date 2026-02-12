const request = require('request');

const ipAddress = req.ip; // Get the user's IP address from the request object
const url = `https://ipapi.co/${ipAddress}/json/`; // Replace with the appropriate API endpoint

request(url, function(err, response, body) {
  if (err) {
    console.log('Error:', err);
  } else {
    const data = JSON.parse(body);
    console.log('Country:', data.country_name);
    console.log('City:', data.city);
    console.log('Latitude:', data.latitude);
    console.log('Longitude:', data.longitude);
  }
});
