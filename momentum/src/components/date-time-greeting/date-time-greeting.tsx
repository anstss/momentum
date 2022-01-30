import React from "react";
import "./date-time-greeting.scss";

const DateTimeGreeting = () => {
  return (
    <section className="date-time center-align">
      <div className="time">17:39:55</div>
      <div className="date">Saturday, January 29</div>
      <div className="greeting center-align">
        Good evening,
        <input
          className="greeting__input center-align"
          placeholder="Enter name"
        />
      </div>
    </section>
  );
};

export default DateTimeGreeting;
