async function Autocomplete(input) {
  const query = new URLSearchParams({
    input,
    key: process.env.TIPSY_TOURIST_GOOGLE_MAPS_SERVER_KEY,
  });
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?${query}`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Google autocomplete request failed (${response.status})`);
  }

  return data;
}

module.exports = Autocomplete;
