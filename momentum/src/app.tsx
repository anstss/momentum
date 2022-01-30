import React from "react";
import "./app.scss";
import DateTimeGreeting from "./components/date-time-greeting/date-time-greeting";
import Quote from "./components/quote/quote";

function App() {
  return (
    <div className="app">
      <DateTimeGreeting />
      <Quote />
    </div>
  );
}

export default App;
