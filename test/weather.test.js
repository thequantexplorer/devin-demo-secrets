const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { createServer } = require('../mock-api/server');
const { getForecast, formatForecast } = require('../src/weather');

let server;
let apiUrl;

before(async () => {
  server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));
  apiUrl = `http://localhost:${server.address().port}`;
});

after(() => server.close());

test('gets the forecast for Austin from the API', async () => {
  const forecast = await getForecast('Austin', { apiUrl });
  assert.equal(formatForecast(forecast), 'Austin: Sunny, high 31°C, low 19°C');
});

test('city names are not case sensitive', async () => {
  const forecast = await getForecast('tokyo', { apiUrl });
  assert.equal(forecast.city, 'Tokyo');
});

test('formatForecast', () => {
  assert.equal(
    formatForecast({ city: 'London', summary: 'Light rain', highC: 14, lowC: 8 }),
    'London: Light rain, high 14°C, low 8°C',
  );
});
