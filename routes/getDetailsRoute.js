const PlaceDetails = require("../lib/placeDetails");

module.exports.getDetails = async (event) => {
  const req = JSON.parse(event.body);
 
  const place_id = req.place_id;
  const data = await PlaceDetails(place_id);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        data: data,
        input: event,
        place_id: place_id
      },
      null,
      2
    ),
  };
};