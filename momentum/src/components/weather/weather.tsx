import React, { useEffect, useRef, useState } from "react";
import { OpenWeatherApiService } from "../../services/open-weather-api-service";
import * as M from "materialize-css";
import IOpenWeatherInfo from "../../types/IOpenWeatherInfo";
import "./weather.scss";
import { defineIconMode } from "../../shared/helpers";

const openWeatherApiService = new OpenWeatherApiService();

const Weather = () => {
  const [weatherInfo, setWeatherInfo] = useState<IOpenWeatherInfo | null>(null);
  const [city, setCity] = useState<string>("Kherson");
  const [dayOrNightIconMode, setDayOrNightIconMode] = useState<string>("");
  const [additionalWeatherInfoIsVisible, setAdditionalWeatherInfoIsVisible] =
    useState<boolean>(false);

  const cityInput = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    cityInput.current!.focus();
  };

  const changeAddWeatherInfoVisibility = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent
  ) => {
    const currentTarget = event.currentTarget as HTMLDivElement;
    if (currentTarget.id === "weather") {
      setAdditionalWeatherInfoIsVisible(!additionalWeatherInfoIsVisible);
      return;
    }
    if (currentTarget.id === "additionalWeatherInfo") {
      event.stopPropagation();
      return;
    }
    if (
      additionalWeatherInfoIsVisible &&
      currentTarget.id !== "additionalWeatherInfo"
    ) {
      setAdditionalWeatherInfoIsVisible(false);
    }
  };

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

  const updateCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCity = event.target.value;
    setCity(newCity);
  };

  const updateWeather = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loadWeather(city);
  };

  useEffect(() => {
    loadWeather(city);
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", changeAddWeatherInfoVisibility);
    return () => {
      document.body.removeEventListener(
        "click",
        changeAddWeatherInfoVisibility
      );
    };
  }, [additionalWeatherInfoIsVisible]);

  useEffect(() => {
    const iconId = weatherInfo?.weather[0].icon;
    if (iconId) setDayOrNightIconMode(defineIconMode(iconId));
  }, [weatherInfo]);

  return (
    <section className="weather col s6 m2 right-align">
      <div
        id={"weather"}
        className="weather__main"
        onClick={changeAddWeatherInfoVisibility}
      >
        <div className="weather__container">
          <i
            className={`owf owf-2x owf-${weatherInfo?.weather[0].id}${dayOrNightIconMode}`}
          ></i>
          <span className="weather__temp">
            {weatherInfo?.main.temp
              ? Math.round(weatherInfo?.main.temp) + "°"
              : ""}
          </span>
        </div>
        <span className="weather__city-name">{weatherInfo?.name}</span>
      </div>
      <div
        id={"additionalWeatherInfo"}
        onClick={changeAddWeatherInfoVisibility}
        className={`card-panel weather__info ${
          additionalWeatherInfoIsVisible ? "" : "hidden"
        }`}
      >
        <form className="weather__form left-align" onSubmit={updateWeather}>
          <div className={"weather__container"}>
            <input
              ref={cityInput}
              className="weather__input"
              placeholder="Enter city"
              value={city}
              onChange={updateCity}
            />
            <i
              className="material-icons icon icon--change"
              onClick={focusInput}
            >
              create
            </i>
          </div>
          <div className="weather__container weather__container--left">
            <i
              className={`owf owf-3x owf-${weatherInfo?.weather[0].id} icon--dark`}
            ></i>
            <span className="weather__temp">
              {weatherInfo?.main.temp
                ? Math.round(weatherInfo?.main.temp) + "°C"
                : ""}
            </span>
          </div>
          <div className="weather__additional-info">
            <div className="additional-info__description">
              {weatherInfo?.weather[0].description}
            </div>
            <div className="additional-info__text">
              Feels like:{" "}
              {weatherInfo?.main.feels_like !== undefined
                ? Math.round(weatherInfo?.main.feels_like) + "°C"
                : ""}
            </div>
            <div className="additional-info__text">
              Humidity: {weatherInfo?.main.humidity}%
            </div>
            <div className="additional-info__text">
              Wind speed: {weatherInfo?.wind.speed} m/s
            </div>
            <div className="additional-info__text">
              Wind gusts: {weatherInfo?.wind.gust} m/s
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Weather;
