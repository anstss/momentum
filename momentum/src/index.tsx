import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "normalize.css";
import { DateTimeServiceContext } from "./app/contexts";
import { DateTimeService } from "./services/date-time-service";

const dateTimeService = new DateTimeService();

ReactDOM.render(
  <Provider store={store}>
    <DateTimeServiceContext.Provider value={dateTimeService}>
      <App />
    </DateTimeServiceContext.Provider>
  </Provider>,
  document.getElementById("root")
);
