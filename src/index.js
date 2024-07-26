// imports
import './style.css';
import WeatherAPI from './weather.js';
import WeatherWrapper from './weather-wrapper';

// code
const weather = new WeatherWrapper(new WeatherAPI());
const tempDisplay = document.querySelector('.focused-weather-pane .temp-container .current-temp-display');
const minTempDisplay = document.querySelector('.focused-weather-pane .temp-container .min-temp-display');
const maxTempDisplay = document.querySelector('.focused-weather-pane .temp-container .max-temp-display');
weather.reload().then(() => {
  let today = weather.week[0];
  let temp = today.temp;
  let maxTemp = today.tempmax;
  let minTemp = today.tempmin;

  tempDisplay.innerText = temp;
  minTempDisplay.innerText = minTemp;
  maxTempDisplay.innerText = maxTemp;
});
