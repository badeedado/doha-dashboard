// EDIT ME — these two numbers decide whose weather this is.
const latitude = 40.4443;    // Pittsburgh
const longitude = -79.9436;

const url = "https://api.open-meteo.com/v1/forecast"
  + `?latitude=${latitude}&longitude=
${longitude}`
  + "&hourly=temperature_2m,apparent_temperature"
  + "&timezone=auto&forecast_days=7";

const response = await fetch(url);
if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
const data = await response.json();

// The API hands us COLUMNS. A chart needs ROWS. This loop is the reshape.
const rows = data.hourly.time.map((t, i) => ({
  time: t,                          // "2026-10-28T14:00"
  day: t.slice(5, 10),              // "10-28"
  hour: Number(t.slice(11, 13)),    // 14
  temperature: data.hourly.temperature_2m[i],
  feelsLike: data.hourly.apparent_temperature[i]
}));

process.stdout.write(JSON.stringify(rows));
