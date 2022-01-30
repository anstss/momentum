import React from "react";
import "./quote.scss";

const Quote = () => {
  return (
    <div className="quote">
      <div className="quote__text">
        "The greatest danger for most of us is not that our aim is too high and
        we miss it, but that it is too low and we reach it."
      </div>
      <div className="quote__info">
        <span className="quote__author">Michelangelo</span>
        <i className="material-icons quote__refresh-icon">refresh</i>
      </div>
    </div>
  );
};

export default Quote;
