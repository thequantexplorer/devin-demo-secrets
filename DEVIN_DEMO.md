# Devin demo: Give Devin an API key safely

**What it shows:** You save an API key as a Devin secret. Devin makes the app read the key from an environment variable, never prints or commits it, and adds a test that fails if the key is missing.

**Needs:** GitHub only

More demos: [devin-advanced-demos](https://github.com/thequantexplorer/devin-advanced-demos)

## The problem

The app calls a weather API that needs a key. Right now the key is a placeholder in `src/config.js`, so the tests fail:

```text
$ npm test
not ok 1 - gets the forecast for Austin from the API
  error: '401 invalid api key'
not ok 2 - city names are not case sensitive
  error: '401 invalid api key'
ok 3 - formatForecast
# pass 1
# fail 2
```

## The demo key

This lab uses a fake key made only for this workshop. The mock API in `mock-api/server.js` accepts it and nothing else:

```text
wk_demo_8f31c2b7d94e
```

A real key would never be written in a file like this. You would only paste it into Devin's Secrets page.

## Set it up

1. Click **Use this template → Create a new repository**, choose your GitHub account or org as the owner, and keep the name `devin-demo-secrets`. The prompt below assumes that name. Use the template rather than a fork: pull requests on a fork go to the original repo by default.
2. In Devin, open [**Settings → Connections → GitHub**](https://app.devin.ai/settings/connections/github) and make sure Devin can access the new repository.
3. Save the key as a Devin secret. Open [**Settings → Secrets**](https://app.devin.ai/settings/secrets) and click **Add secret**. In the **New secret** panel, choose **Personal** under **Scope**, keep **Type** as **Key-value**, type `WEATHER_API_KEY` in **Name**, and paste `wk_demo_8f31c2b7d94e` in **Value**. Click **Create secret**. (See [Secrets](https://docs.devin.ai/product-guides/secrets).)

## Prompt

Start a new Devin session and paste this. Replace `<you>` with your GitHub user or org.

```text
The tests in https://github.com/<you>/devin-demo-secrets fail with "401 invalid api key" because the API key in src/config.js is a placeholder.

I saved the real key as a Devin secret named WEATHER_API_KEY. Make the app read the key from the WEATHER_API_KEY environment variable and remove the placeholder. Never print, log or commit the key's value: not in code, tests, commit messages, the PR or your messages to me. Check every code path that could print it, including debug logging, and hide it there. If the key is missing, the app should stop with a clear error that names WEATHER_API_KEY.

Add a test that fails if WEATHER_API_KEY is missing, and a test that the missing-key error is clear. Run the full test suite with the secret and show me it passes. Then open a PR. In the PR description, explain how to set WEATHER_API_KEY and confirm the key's value appears nowhere in the diff.
```

## What to watch

- Devin runs the tests with the `WEATHER_API_KEY` secret bound to the command. It never types out the value.
- It finds the debug log in `src/weather.js` that would print the key, and hides it.

## Done when

- The PR reads the key from `WEATHER_API_KEY`, and all tests pass.
- A test fails with a clear message when `WEATHER_API_KEY` is not set.
- Searching the PR for `wk_demo_8f31c2b7d94e` finds nothing.
