import React from "react";
import { DateTimeGreetingService } from "../services/date-time-greeting-service";

export const DateTimeGreetingServiceContext = React.createContext(
  new DateTimeGreetingService()
);
