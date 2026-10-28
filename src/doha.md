---
theme: dashboard
toc: false
---

```js
const forecast = FileAttachment("./data/doha.json").json();
```

```js
// QUESTION 1 — What is this week going to do?
function temperatureLine(data, {width} = {}) {
  return Plot.plot({
    title: "Hourly temperature",
    width,
    height: 260,
    x: {label: null},
    y: {grid: true, inset: 10, label: "°C"},
    marks: [
      Plot.lineY(data, {
        x: d => new Date(d.time),
        y: "temperature",
        stroke: "temperature",
        z: null,
        curve: "step-after"
      })
    ]
  });
}

// QUESTION 2 — When in the day does the heat arrive?
function temperatureHeatmap(data, {width} = {}) {
  return Plot.plot({
    title: "When is it hottest?",
    width,
    height: 420,
    color: {scheme: "YlOrRd", legend: true, label: "°C"},
    x: {label: "Date"},
    y: {label: "Hour of day"},
    marks: [
      Plot.cell(data, {x: "day", y: "hour", fill: "temperature", tip: true})
    ]
  });
}
// QUESTION 3 — Does the thermometer tell the whole story?
function feelsLikeGap(data, {width} = {}) {
  return Plot.plot({
    title: "What the thermometer says vs. what your body feels",
    width,
    height: 420,
    x: {label: null},
    y: {grid: true, label: "°C"},
    marks: [
      Plot.areaY(data, {
        x: d => new Date(d.time),
        y1: "temperature",
        y2: "feelsLike",
        fill: "#f97316",
        fillOpacity: 0.25
      }),
      Plot.lineY(data, {x: d => new Date(d.time), y: "temperature", stroke: "#0ea5e9", strokeWidth: 2}),
      Plot.lineY(data, {x: d => new Date(d.time), y: "feelsLike", stroke: "#f97316", strokeWidth: 2})
    ]
  });
}
```

<div class="grid grid-cols-1">
  <div class="card">${resize((width) => temperatureLine(forecast, {width}))}</div>
</div>

<div class="grid grid-cols-2">
  <div class="card">${resize((width) => temperatureHeatmap(forecast, {width}))}</div>
  <div class="card">${resize((width) => feelsLikeGap(forecast, {width}))}</div>
</div>
     