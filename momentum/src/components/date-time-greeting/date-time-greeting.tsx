import React, { useContext, useEffect, useState } from "react";
import "./date-time-greeting.scss";
import ITime from "../../types/ITime";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { DateTimeServiceContext } from "../../app/contexts";
import { dateTimeGreetingSlice } from "../../app/slices/date-time-greeting-slice";

const DateTimeGreeting = () => {
  const dateTimeService = useContext(DateTimeServiceContext);
  const timeInitState: ITime = dateTimeService.getCurrentTime();
  const dateInitState = dateTimeService.getCurrentDate();

  const [time, setTime] = useState<ITime>(timeInitState);
  const [date, setDate] = useState<string>(dateInitState);

  const dispatch = useAppDispatch();
  const { timeOfDay } = useAppSelector(
    (state) => state.dateTimeGreetingReducer
  );
  const { setTimeOfDay } = dateTimeGreetingSlice.actions;

  const updateDateTimeGreeting = () => {
    const updatedTime = dateTimeService.getCurrentTime();
    setTime(updatedTime);
    const updatedDate = dateTimeService.getCurrentDate();
    setDate(updatedDate);
    const updatedTimeOfDay = dateTimeService.getCurrentTimeOfDay();
    dispatch(setTimeOfDay(updatedTimeOfDay));
  };

  useEffect(() => {
    const timeOfDayInitState = dateTimeService.getCurrentTimeOfDay();
    dispatch(setTimeOfDay(timeOfDayInitState));
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
