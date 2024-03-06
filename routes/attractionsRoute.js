const Attractions = require("../lib/attractions");

module.exports.attractions = async (event) => {
  const req = JSON.parse(event.body);
 
  const lat = req.lat;
  const lng = req.lng;
  const data = await Attractions(lat, lng);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        data: data,
        input: event,
        lat: req.lat,
        lng: req.lng,
      },
      null,
      2
    ),
  };
};