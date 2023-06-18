const NodeGeocoder = require("node-geocoder");

const options = {
  provider: process.env.GEOCODE_PROVIDER,
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null, // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
