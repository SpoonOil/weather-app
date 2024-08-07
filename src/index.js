// imports
import "./style.css";
import WeatherAPI from "./weather.js";
import WeatherWrapper from "./weather-wrapper";

function importAll(r) {
  let images = {};
  r.keys().map((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const images = importAll(
  require.context("./icons", false, /\.(png|jpe?g|svg)$/),
);

// code
const weather = new WeatherWrapper(new WeatherAPI());

function updateDisplay() {
  weather.reload().then(() => {
    (function renderToday() {
      let today = weather.week[0];
      console.log(today);

      const tempDisplay = document.querySelector(
        ".focused-weather-pane .temp-container .current-temp-display",
      );
      const minTempDisplay = document.querySelector(
        ".focused-weather-pane .temp-container .min-temp-display",
      );
      const maxTempDisplay = document.querySelector(
        ".focused-weather-pane .temp-container .max-temp-display",
      );

      const descriptionDisplay = document.querySelector(
        ".focused-weather-pane .other-info-container .weather-description",
      );

      const iconDisplay = document.querySelector(".focused-weather-pane img");

      iconDisplay.src = images[today.icon + ".png"];
      descriptionDisplay.innerText = today.description;
      tempDisplay.innerText = today.temp;
      minTempDisplay.innerText = today.tempmin;
      maxTempDisplay.innerText = today.tempmax;
    })();
  });
}

updateDisplay();
