// API request for tourist attractions neaby coordinates 
async function Attractions(lat, lng, requestedRadius) {
  const radius = Number.isFinite(Number(requestedRadius))
    ? Math.min(50000, Math.max(100, Math.round(Number(requestedRadius))))
    : 3000;
  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=${radius}&type=tourist_attraction&key=${process.env.TIPSY_TOURIST_GOOGLE_MAPS_SERVER_KEY}`
  );
  const data = await resp.json();
  console.log(data);
  return data;
}

module.exports = Attractions;
