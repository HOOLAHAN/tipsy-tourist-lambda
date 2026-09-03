const Autocomplete = require("../lib/autocomplete");

module.exports.autocomplete = async (event) => {
  try {
    const { input } = JSON.parse(event.body || "{}");
    const query = typeof input === "string" ? input.trim() : "";
    if (query.length < 3 || query.length > 200) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "input must contain between 3 and 200 characters" }),
      };
    }

    const data = await Autocomplete(query);
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return {
      statusCode: 502,
      body: JSON.stringify({ error: error.message || "Autocomplete unavailable" }),
    };
  }
};
