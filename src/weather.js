class WeatherAPI {
  constructor() {
    this.baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/CITY?unitGroup=us&key=85F9NVJY4MKWQBZWM7YBRE4MK&contentType=json';
    this.city = 'Bloomfield';
  }

  setCity(cityString) {
    this.city = cityString;
  }

  async getWeek() {
    return this.getWeatherJSON().then((result) => {
      return result.days;
    });
  }

  makeURL() {
    return this.baseURL.replace('CITY', this.city);
  }

  async getWeatherJSON() {
    return fetch(this.makeURL(), { mode: 'cors' })
      .then((result) => {
        return result.json();
      })
      .catch((e) => {
        throw e;
      });
  }

  logWeatherJSON() {
    this.getWeatherJSON().then((result) => { console.log(result); });
  }
}

export default WeatherAPI;
