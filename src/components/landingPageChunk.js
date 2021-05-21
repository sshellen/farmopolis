import React from "react";
import { Link } from "react-router-dom";

const LandingPageChunk = ({ img, text, onClickHandler }) => {
  return (
    <div className="landingChunk" onClick={onClickHandler}>
      <div>
        <Link to="farmer">
          <img src={img} />
        </Link>
      </div>
      <span>{text}</span>
    </div>
  );
};

export default LandingPageChunk;
