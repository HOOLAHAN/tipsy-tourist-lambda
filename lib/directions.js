function coordinate(value, name) {
  const latitude = Number(value?.latitude);
  const longitude = Number(value?.longitude);
  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    throw new Error(`${name} must contain valid latitude and longitude values`);
  }
  return `${latitude},${longitude}`;
}

async function Directions(origin, destination, waypoints, requestedMode) {
  const mode = ["walking", "bicycling", "driving"].includes(requestedMode)
    ? requestedMode
    : "walking";
  const points = Array.isArray(waypoints) ? waypoints : [];
  if (points.length > 20) {
    throw new Error("A route can contain at most 20 waypoints");
  }

  const query = new URLSearchParams({
    origin: coordinate(origin, "origin"),
    destination: coordinate(destination, "destination"),
    mode,
    key: process.env.TIPSY_TOURIST_GOOGLE_MAPS_SERVER_KEY,
  });
  if (points.length) {
    query.set(
      "waypoints",
      points.map((point, index) => coordinate(point, `waypoint ${index + 1}`)).join("|")
    );
  }

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/directions/json?${query}`
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Google directions request failed (${response.status})`);
  }

  return data;
}

module.exports = Directions;
