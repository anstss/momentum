import React from "react";
import "./shared/styles.scss";
import "./app.scss";
import DateTimeGreeting from "./components/date-time-greeting/date-time-greeting";
import Quote from "./components/quote/quote";
import Settings from "./components/settings/settings";
import Todo from "./components/todo/todo";
import Links from "./components/links/links";
import Music from "./components/music/music";
import Weather from "./components/weather/weather";

function App() {
  return (
    <div className="app">
      <div className="row small-container">
        <Links />
        <Music />
        <Weather />
      </div>
      <DateTimeGreeting />
      <div className="row small-container">
        <Settings />
        <Quote />
        <Todo />
      </div>
    </div>
  );
}

export default App;
