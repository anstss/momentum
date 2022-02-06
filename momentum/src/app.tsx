import React, { useEffect, useState } from "react";
import "./shared/styles.scss";
import "./app.scss";
import DateTimeGreeting from "./components/date-time-greeting/date-time-greeting";
import Quote from "./components/quote/quote";
import Settings from "./components/settings/settings";
import Todo from "./components/todo/todo";
import Links from "./components/links/links";
import Music from "./components/music/music";
import Weather from "./components/weather/weather";
import { FlickrApiService } from "./services/flickr-api-service";
import * as M from "materialize-css";
import IFlickrPhoto from "./types/IFlickrPhoto";
import { getRandomNumber } from "./shared/helpers";
import { useAppSelector } from "./app/hooks";

const flickrApiService = new FlickrApiService();

function App() {
  const [backgroundImageURL, setBackgroundImageURL] = useState<string>("");
  const [backgroundImageList, setBackgroundImageList] = useState<
    IFlickrPhoto[]
  >([]);
  const [backgroundImageIndex, setBackgroundImageIndex] = useState<
    number | null
  >(null);

  const { timeOfDay } = useAppSelector(
    (state) => state.dateTimeGreetingReducer
  );

  useEffect(() => {
    const loadBackgroundImage = async (timeOfDay: string) => {
      try {
        const backgroundImageList =
          await flickrApiService.getFilteredBackgroundImageList(timeOfDay);
        setBackgroundImageList(backgroundImageList);
        const bgImageIndex = getRandomNumber(0, backgroundImageList.length);
        setBackgroundImageIndex(bgImageIndex);
        const bgImageURL = backgroundImageList[bgImageIndex].url_h;
        setBackgroundImageURL(bgImageURL);
      } catch (e) {
        M.toast({ html: e.message });
      }
    };
    loadBackgroundImage(timeOfDay);
  }, [timeOfDay]);

  const loadPrevBackgroundImage = () => {
    if (backgroundImageIndex === null) return;
    let prevBgImageIndex = backgroundImageIndex - 1;
    if (prevBgImageIndex < 0) prevBgImageIndex = backgroundImageList.length - 1;
    setBackgroundImageIndex(prevBgImageIndex);
    const prevBgImageURL = backgroundImageList[prevBgImageIndex].url_h;
    setBackgroundImageURL(prevBgImageURL);
  };

  const loadNextBackgroundImage = () => {
    if (backgroundImageIndex === null) return;
    let nextBgImageIndex = backgroundImageIndex + 1;
    if (nextBgImageIndex >= backgroundImageList.length) nextBgImageIndex = 0;
    setBackgroundImageIndex(nextBgImageIndex);
    const nextBgImageURL = backgroundImageList[nextBgImageIndex].url_h;
    setBackgroundImageURL(nextBgImageURL);
  };

  return (
    <div
      className="app"
      style={{ backgroundImage: `url(${backgroundImageURL})` }}
    >
      <div className="app__cover"></div>
      <div className="row small-container">
        <Links />
        <Music />
        <Weather />
      </div>
      <div className="app__center-container">
        <i
          className="material-icons icon icon--prev"
          onClick={loadPrevBackgroundImage}
        >
          chevron_left
        </i>
        <DateTimeGreeting />
        <i
          className="material-icons icon icon--next"
          onClick={loadNextBackgroundImage}
        >
          chevron_right
        </i>
      </div>
      <div className="row small-container">
        <Settings />
        <Quote />
        <Todo />
      </div>
    </div>
  );
}

export default App;
