import ITime from "../types/ITime";

export class DateTimeService {
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
}
