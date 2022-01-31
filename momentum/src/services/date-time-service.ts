import ITimeState from "../types/ITimeState";

export class DateTimeService {
  getCurrentTime = (): ITimeState => {
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
}
