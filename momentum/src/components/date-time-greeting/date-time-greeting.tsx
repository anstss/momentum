import React, { useEffect, useState } from "react";
import "./date-time-greeting.scss";
import ITimeState from "../../types/ITimeState";
import { DateTimeService } from "../../services/date-time-service";

const dateTimeService = new DateTimeService();
const timeInitState: ITimeState = dateTimeService.getCurrentTime();

const DateTimeGreeting = () => {
  const [time, setTime] = useState<ITimeState>(timeInitState);

  const updateTime = () => {
    const updatedTime = dateTimeService.getCurrentTime();
    setTime(updatedTime);
  };

  useEffect(() => {
    const timeInterval = setInterval(updateTime, 500);
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
      <div className="date">Saturday, January 29</div>
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
