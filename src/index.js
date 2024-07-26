// imports
import './style.css';
import WeatherAPI from './weather.js';
import WeatherWrapper from './weather-wrapper';

// code
const weather = new WeatherWrapper(new WeatherAPI());

weather.reload().then(() => {
  let today = weather.week[0];
  let temp = today.temp;
  let maxTemp = today.tempmax;
  let minTemp = today.tempmin;
  console.log(minTemp, temp, maxTemp);
})
