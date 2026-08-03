// API request for bars neaby coordinates 
async function Locations(lat, lng, requestedRadius) {
  const radius = Number.isFinite(Number(requestedRadius))
    ? Math.min(50000, Math.max(100, Math.round(Number(requestedRadius))))
    : 500;
  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=${radius}&keyword=pub&rankby=prominence&key=${process.env.TIPSY_TOURIST_GOOGLE_MAPS_SERVER_KEY}`
  );
  const data = await resp.json();
  console.log(data);
  return data;
}

module.exports = Locations;
