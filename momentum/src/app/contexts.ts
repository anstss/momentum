import React from "react";
import { DateTimeService } from "../services/date-time-service";

export const DateTimeServiceContext = React.createContext(
  new DateTimeService()
);
