const { config } = require('./config');

class WeatherApiError extends Error {
  constructor(status, message) {
    super(`${status} ${message}`);
    this.name = 'WeatherApiError';
    this.status = status;
  }
}

async function getForecast(city, { apiUrl = config.apiUrl, apiKey = config.apiKey } = {}) {
  const url = `${apiUrl}/v1/forecast?city=${encodeURIComponent(city)}`;
  const headers = { Accept: 'application/json', 'X-Api-Key': apiKey };

  if (process.env.WEATHER_DEBUG) {
    console.log('[weather] GET', url, JSON.stringify(headers));
  }

  const res = await fetch(url, { headers });
  const body = await res.json();
  if (!res.ok) {
    throw new WeatherApiError(res.status, body.error || res.statusText);
  }
  return body;
}

function formatForecast(f) {
  return `${f.city}: ${f.summary}, high ${f.highC}°C, low ${f.lowC}°C`;
}

module.exports = { getForecast, formatForecast, WeatherApiError };
