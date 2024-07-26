class WeatherWrapper {
  constructor(api) {
    this.api = api;
  }

  async reload() {
    return this.api
      .getWeatherJSON()
      .then((result) => {
        this.weather = result;
      })
      .then(() => {
        this.update(this.weather);
      });
  }

  update(dataObject) {
    this.week = dataObject.days;
    console.log('updated');
  }
}

export default WeatherWrapper;
