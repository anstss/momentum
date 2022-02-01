import React, { useContext, useEffect, useState } from "react";
import "./date-time-greeting.scss";
import ITime from "../../types/ITime";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { DateTimeGreetingServiceContext } from "../../app/contexts";
import { dateTimeGreetingSlice } from "../../app/slices/date-time-greeting-slice";

const DateTimeGreeting = () => {
  const dateTimeGreetingService = useContext(DateTimeGreetingServiceContext);
  const timeInitState: ITime = dateTimeGreetingService.getCurrentTime();
  const dateInitState = dateTimeGreetingService.getCurrentDate();

  const [time, setTime] = useState<ITime>(timeInitState);
  const [date, setDate] = useState<string>(dateInitState);
  const [userName, setUserName] = useState<string>("");

  const dispatch = useAppDispatch();
  const { timeOfDay } = useAppSelector(
    (state) => state.dateTimeGreetingReducer
  );
  const { setTimeOfDay } = dateTimeGreetingSlice.actions;

  const updateDateTimeGreeting = () => {
    const updatedTime = dateTimeGreetingService.getCurrentTime();
    setTime(updatedTime);
    const updatedDate = dateTimeGreetingService.getCurrentDate();
    setDate(updatedDate);
    const updatedTimeOfDay = dateTimeGreetingService.getCurrentTimeOfDay();
    dispatch(setTimeOfDay(updatedTimeOfDay));
  };

  const updateUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userName = event.target.value;
    setUserName(userName);
    dateTimeGreetingService.saveUserNameToLocalStorage(userName);
  };

  useEffect(() => {
    const timeInterval = setInterval(updateDateTimeGreeting, 500);
    const timeOfDayInitState = dateTimeGreetingService.getCurrentTimeOfDay();
    dispatch(setTimeOfDay(timeOfDayInitState));
    const userName = dateTimeGreetingService.getUserNameFromLocalStorage();
    setUserName(userName);
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
          value={userName}
          onChange={updateUserName}
        />
      </div>
    </section>
  );
};

export default DateTimeGreeting;
