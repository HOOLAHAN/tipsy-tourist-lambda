// API request for more details on a specific place 
async function PlaceDetails(place_id) {
  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${process.env.TIPSY_TOURIST_GOOGLE_MAPS_SERVER_KEY}`
  );
  const data = await resp.json();
  console.log(data);
  return data;
}

module.exports = PlaceDetails;
