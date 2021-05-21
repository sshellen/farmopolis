import React from "react";
import { Link } from "react-router-dom";

const Splash = () => {
  return (
    <div className="splash">
      <Link to="/landing">
        <img className="splashLogo" src="./img/farmopolisLogo.svg" />
      </Link>
    </div>
  );
};

export default Splash;
