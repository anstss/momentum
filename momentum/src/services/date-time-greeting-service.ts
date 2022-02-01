import ITime from "../types/ITime";
import { LOCAL_STORAGE_KEY } from "../shared/constants";
import ILocalStorageData from "../types/ILocalStorageData";

export class DateTimeGreetingService {
  getCurrentTime = (): ITime => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    return {
      hours,
      minutes,
      seconds,
    };
  };

  getCurrentDate = (): string => {
    const currentDate = new Date();
    const options = { weekday: "long", month: "long", day: "numeric" };
    const transformedDate = new Intl.DateTimeFormat("en-US", options).format(
      currentDate
    );
    return transformedDate;
  };

  getCurrentTimeOfDay = (): string => {
    const currentHours = this.getCurrentTime().hours;
    if (currentHours >= 0 && currentHours <= 5) return "night";
    if (currentHours >= 6 && currentHours <= 11) return "morning";
    if (currentHours >= 12 && currentHours <= 17) return "afternoon";
    if (currentHours >= 18 && currentHours <= 23) return "evening";
    return "time of day not defined";
  };

  getUserNameFromLocalStorage = (): string => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    let userName = "";
    if (data) {
      const dataObj: ILocalStorageData = JSON.parse(data);
      userName = dataObj.userName ? dataObj.userName : "";
    }
    return userName;
  };

  saveUserNameToLocalStorage = (userName: string): void => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const oldData: ILocalStorageData = JSON.parse(data);
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          ...oldData,
          userName,
        })
      );
      return;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ userName }));
  };
}
