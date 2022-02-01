import React, { useEffect, useState } from "react";
import "./date-time-greeting.scss";
import ITime from "../../types/ITime";
import { DateTimeService } from "../../services/date-time-service";

const dateTimeService = new DateTimeService();
const timeInitState: ITime = dateTimeService.getCurrentTime();
const dateInitState = dateTimeService.getCurrentDate();

const DateTimeGreeting = () => {
  const [time, setTime] = useState<ITime>(timeInitState);
  const [date, setDate] = useState<string>(dateInitState);

  const updateDateTime = () => {
    const updatedTime = dateTimeService.getCurrentTime();
    setTime(updatedTime);
    const updatedDate = dateTimeService.getCurrentDate();
    setDate(updatedDate);
  };

  useEffect(() => {
    const timeInterval = setInterval(updateDateTime, 500);
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
        Good evening,
        <input
          className="greeting__input center-align"
          placeholder="Enter name"
        />
      </div>
    </section>
  );
};

export default DateTimeGreeting;
