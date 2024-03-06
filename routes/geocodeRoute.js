// ./geocodeRoute.js
const geocode = require("../lib/geocode");

module.exports.geocode = async (event) => {
  try {
    const { address } = JSON.parse(event.body);
    const location = await geocode(address);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Geocode successful",
        location,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Error in geocoding",
        error: error.message,
      }),
    };
  }
};
