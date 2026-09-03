const assert = require("node:assert/strict");
const test = require("node:test");

const Autocomplete = require("../lib/autocomplete");
const Directions = require("../lib/directions");
const { autocomplete } = require("../routes/autocompleteRoute");
const { directions } = require("../routes/directionsRoute");

process.env.TIPSY_TOURIST_GOOGLE_MAPS_SERVER_KEY = "test-key";

test("autocomplete proxies a global query through the server key", async () => {
  let requestedUrl;
  global.fetch = async (url) => {
    requestedUrl = String(url);
    return { ok: true, json: async () => ({ status: "OK", predictions: [] }) };
  };

  const result = await Autocomplete("Paris, France");
  const url = new URL(requestedUrl);
  assert.equal(url.searchParams.get("input"), "Paris, France");
  assert.equal(url.searchParams.get("key"), "test-key");
  assert.equal(url.searchParams.has("components"), false);
  assert.equal(result.status, "OK");
});

test("directions validates and proxies coordinates and waypoints", async () => {
  let requestedUrl;
  global.fetch = async (url) => {
    requestedUrl = String(url);
    return { ok: true, json: async () => ({ status: "OK", routes: [] }) };
  };

  await Directions(
    { latitude: 51.5, longitude: -0.1 },
    { latitude: 51.6, longitude: -0.2 },
    [{ latitude: 51.55, longitude: -0.15 }],
    "walking"
  );
  const url = new URL(requestedUrl);
  assert.equal(url.searchParams.get("origin"), "51.5,-0.1");
  assert.equal(url.searchParams.get("destination"), "51.6,-0.2");
  assert.equal(url.searchParams.get("waypoints"), "51.55,-0.15");
  assert.equal(url.searchParams.get("mode"), "walking");
});

test("proxy routes reject malformed client input", async () => {
  const autocompleteResponse = await autocomplete({ body: JSON.stringify({ input: "x" }) });
  assert.equal(autocompleteResponse.statusCode, 400);

  const directionsResponse = await directions({
    body: JSON.stringify({ origin: {}, destination: {} }),
  });
  assert.equal(directionsResponse.statusCode, 400);
});
