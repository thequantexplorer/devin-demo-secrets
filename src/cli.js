#!/usr/bin/env node
const { getForecast, formatForecast } = require('./weather');

async function main() {
  const city = process.argv[2] || 'Austin';
  try {
    console.log(formatForecast(await getForecast(city)));
  } catch (err) {
    console.error(`Could not get the forecast: ${err.message}`);
    process.exitCode = 1;
  }
}

main();
