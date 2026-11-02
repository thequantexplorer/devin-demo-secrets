# acme-weather

A small Node.js client and command-line tool for the Acme Weather API. It needs Node 18 or newer and has no dependencies.

The Acme Weather API needs an API key, sent in the `X-Api-Key` header. For this demo, `mock-api/server.js` is a tiny local copy of the API. It is not deployed anywhere.

```sh
npm test                 # starts the mock API inside the tests
npm run mock-api         # mock API on http://localhost:4010
npm run forecast Austin  # in a second terminal
```

Known issue: the API key is a placeholder in `src/config.js`, so every API call fails with `401 invalid api key`.

---

This repo is a starter for a Devin demo. See [DEVIN_DEMO.md](DEVIN_DEMO.md) for setup and the prompt.
