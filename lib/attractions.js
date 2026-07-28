// API request for tourist attractions neaby coordinates 
async function Attractions(lat, lng) {
  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=3000&type=tourist_attraction&key=${process.env.TIPSY_TOURIST_GOOGLE_MAPS_SERVER_KEY}`
  );
  const data = await resp.json();
  console.log(data);
  return data;
}

module.exports = Attractions;
