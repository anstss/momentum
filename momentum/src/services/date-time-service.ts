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

  getCurrentTimeOfDay = (): string => {
    const currentHours = this.getCurrentTime().hours;
    if (currentHours >= 0 && currentHours <= 5) return "night";
    if (currentHours >= 6 && currentHours <= 11) return "morning";
    if (currentHours >= 12 && currentHours <= 17) return "afternoon";
    if (currentHours >= 18 && currentHours <= 23) return "evening";
    return "time of day not defined";
  };
}
