import React, { useEffect, useState } from "react";
import "./date-time-greeting.scss";
import ITime from "../../types/ITime";
import { DateTimeService } from "../../services/date-time-service";

const dateTimeService = new DateTimeService();
const timeInitState: ITime = dateTimeService.getCurrentTime();
const dateInitState = dateTimeService.getCurrentDate();
const timeOfDayInitState = dateTimeService.getCurrentTimeOfDay();

const DateTimeGreeting = () => {
  const [time, setTime] = useState<ITime>(timeInitState);
  const [date, setDate] = useState<string>(dateInitState);
  const [timeOfDay, setTimeOfDay] = useState<string>(timeOfDayInitState);

  const updateDateTimeGreeting = () => {
    const updatedTime = dateTimeService.getCurrentTime();
    setTime(updatedTime);
    const updatedDate = dateTimeService.getCurrentDate();
    setDate(updatedDate);
    const updatedTimeOfDay = dateTimeService.getCurrentTimeOfDay();
    setTimeOfDay(updatedTimeOfDay);
  };

  useEffect(() => {
    const timeInterval = setInterval(updateDateTimeGreeting, 500);
    return () => clearInterval(timeInterval);
  }, []);

  const { hours, minutes, seconds } = time;

  return (
    <section className="date-time-greeting center-align">
      <div className="time">
        {hours < 10 ? `0${hours}` : hours}:
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div className="date">{date}</div>
      <div className="greeting center-align">
        Good {timeOfDay},
        <input
          className="greeting__input center-align"
          placeholder="Enter name"
        />
      </div>
    </section>
  );
};

export default DateTimeGreeting;
