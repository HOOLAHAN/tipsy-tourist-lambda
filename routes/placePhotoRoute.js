module.exports.placePhoto = async (event) => {
  const photoReference = event.queryStringParameters?.photo_reference;
  const requestedWidth = Number(event.queryStringParameters?.maxwidth || 1000);
  const maxwidth = Math.max(100, Math.min(1600, Number.isFinite(requestedWidth) ? requestedWidth : 1000));

  if (!photoReference) {
    return { statusCode: 400, body: JSON.stringify({ error: "photo_reference is required" }) };
  }

  const query = new URLSearchParams({
    maxwidth: String(maxwidth),
    photo_reference: photoReference,
    key: process.env.TIPSY_TOURIST_GOOGLE_MAPS_SERVER_KEY,
  });
  const response = await fetch(`https://maps.googleapis.com/maps/api/place/photo?${query}`, {
    redirect: "manual",
  });
  const location = response.headers.get("location");

  if (!location) {
    return {
      statusCode: response.ok ? 404 : response.status,
      body: JSON.stringify({ error: "Photo unavailable" }),
    };
  }

  return {
    statusCode: 302,
    headers: {
      Location: location,
      "Cache-Control": "public, max-age=86400",
    },
    body: "",
  };
};
