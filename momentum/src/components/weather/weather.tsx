import React, { useEffect, useState } from "react";
import { OpenWeatherApiService } from "../../services/open-weather-api-service";
import * as M from "materialize-css";
import IOpenWeatherInfo from "../../types/IOpenWeatherInfo";

const openWeatherApiService = new OpenWeatherApiService();

const Weather = () => {
  const [weatherInfo, setWeatherInfo] = useState<IOpenWeatherInfo | null>(null);

  useEffect(() => {
    const loadWeather = async (cityName: string) => {
      try {
        const currentWeatherInfo = await openWeatherApiService.getWeatherInfo(
          cityName
        );
        setWeatherInfo(currentWeatherInfo);
      } catch (e) {
        M.toast({ html: e.message });
      }
    };
    loadWeather("Kherson");
  }, []);

  return <section className="weather col s6 m2 right-align">Weather</section>;
};

export default Weather;
