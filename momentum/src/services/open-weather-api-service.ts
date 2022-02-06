import axios from "axios";
import IOpenWeatherInfo from "../types/IOpenWeatherInfo";
import IGeoCoordinates from "../types/IGeoCoordinates";

const OPEN_WEATHER_BASE_URL = "https://api.openweathermap.org/";
const OPEN_WEATHER_API_KEY = "c9126e783d7509011a37bbe582612559";

export class OpenWeatherApiService {
  getGeoCoordinates = async (cityName: string) => {
    const params = {
      q: cityName,
      appid: OPEN_WEATHER_API_KEY,
    };
    try {
      const res = await axios.get<IGeoCoordinates[]>(
        `${OPEN_WEATHER_BASE_URL}geo/1.0/direct`,
        { params }
      );
      const { lat, lon } = res.data[0];
      return { lat, lon };
    } catch (error) {
      return error;
    }
  };

  getWeatherInfo = async (cityName: string) => {
    const geoCoordinates = await this.getGeoCoordinates(cityName);
    if (geoCoordinates instanceof Error)
      throw new Error(`Something went wrong. Error: ${geoCoordinates.message}`);
    const { lat, lon } = geoCoordinates;
    const params = {
      lat,
      lon,
      appid: OPEN_WEATHER_API_KEY,
      units: "metric",
    };
    try {
      const res = await axios.get<IOpenWeatherInfo>(
        `${OPEN_WEATHER_BASE_URL}data/2.5/weather`,
        { params }
      );
      return res.data;
    } catch (error) {
      throw new Error(`Something went wrong. Error: ${error.message}`);
    }
  };
}
