import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "normalize.css";
import { DateTimeGreetingServiceContext } from "./app/contexts";
import { DateTimeGreetingService } from "./services/date-time-greeting-service";

const dateTimeService = new DateTimeGreetingService();

ReactDOM.render(
  <Provider store={store}>
    <DateTimeGreetingServiceContext.Provider value={dateTimeService}>
      <App />
    </DateTimeGreetingServiceContext.Provider>
  </Provider>,
  document.getElementById("root")
);
