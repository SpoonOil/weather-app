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

function getPanes() {
  const allPanes = Array.from(document.querySelectorAll(".weather-pane"));

  allPanes.forEach((pane) => {
    pane.tempDisplay = pane.querySelector(".current-temp-display");
    pane.minTempDisplay = pane.querySelector(".min-temp-display");
    pane.maxTempDisplay = pane.querySelector(".max-temp-display");
    pane.descriptionDisplay = pane.querySelector(".weather-description")
    pane.iconDisplay = pane.querySelector("img")
  });

  return allPanes;
}

const panes = getPanes()

function updateDisplay() {
  weather.reload().then(() => {
    /**
      * renders a single pane's information
      * @param {number} index of week
      */
    function renderDay(index) {
      let pane = panes[index]
      let today = weather.week[index];

      pane.iconDisplay.src = images[today.icon + ".png"];
      pane.descriptionDisplay.innerText = today.description;
      pane.tempDisplay.innerText = today.temp;

      //round these
      pane.minTempDisplay.innerText = today.tempmin.toFixed(0);
      pane.maxTempDisplay.innerText = today.tempmax.toFixed(0);
    }

    for (let paneIndex in panes) {
      renderDay(paneIndex)
    }
  });
}

updateDisplay();

const search = document.getElementById("city-search-input");

const searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", () => {
  const newCity = search.value;
  console.log(weather);

  weather.setCity(newCity);
  updateDisplay();
});
