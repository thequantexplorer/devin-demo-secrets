// A tiny stand-in for the Acme Weather API. It runs on your machine (or Devin's)
// and is not deployed anywhere. It only knows a hash of the valid key.
const http = require('node:http');
const crypto = require('node:crypto');

const VALID_KEY_SHA256 = 'b284dd3117bf5ede525fc5b8ceea6bbf7a8d53285b880c38ab1ca5506d36f3a3';

const FORECASTS = {
  austin: { city: 'Austin', summary: 'Sunny', highC: 31, lowC: 19 },
  london: { city: 'London', summary: 'Light rain', highC: 14, lowC: 8 },
  tokyo: { city: 'Tokyo', summary: 'Cloudy', highC: 22, lowC: 16 },
};

function isValidKey(key) {
  if (typeof key !== 'string' || key.length === 0) return false;
  const hash = crypto.createHash('sha256').update(key).digest();
  return crypto.timingSafeEqual(hash, Buffer.from(VALID_KEY_SHA256, 'hex'));
}

function createServer() {
  return http.createServer((req, res) => {
    const send = (status, body) => {
      res.writeHead(status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(body));
    };
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname !== '/v1/forecast') return send(404, { error: 'not found' });

    const key = req.headers['x-api-key'];
    if (!key) return send(401, { error: 'missing api key' });
    if (!isValidKey(key)) return send(401, { error: 'invalid api key' });

    const forecast = FORECASTS[(url.searchParams.get('city') || '').toLowerCase()];
    if (!forecast) return send(404, { error: 'unknown city' });
    return send(200, forecast);
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT) || 4010;
  createServer().listen(port, () => console.log(`Mock Acme Weather API on http://localhost:${port}`));
}

module.exports = { createServer };
