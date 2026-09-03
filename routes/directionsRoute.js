const Directions = require("../lib/directions");

module.exports.directions = async (event) => {
  try {
    const { origin, destination, waypoints, mode } = JSON.parse(event.body || "{}");
    const data = await Directions(origin, destination, waypoints, mode);
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    const clientError = /must contain|at most/.test(error.message || "");
    return {
      statusCode: clientError ? 400 : 502,
      body: JSON.stringify({ error: error.message || "Directions unavailable" }),
    };
  }
};
