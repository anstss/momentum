interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export default interface IOpenWeatherInfo {
  coord: {
    lon: number;
    lat: number;
  };
  weather: IWeather[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
    gust: number;
  };
  name: string;
  id: number;
}
