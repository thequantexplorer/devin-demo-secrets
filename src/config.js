// TODO: stop hard-coding the key. Get the real one from the team.
const config = {
  apiUrl: process.env.WEATHER_API_URL || 'http://localhost:4010',
  apiKey: 'YOUR_API_KEY_HERE',
};

module.exports = { config };
