import React from "react";
import { Link } from "react-router-dom";

const Header = ({ itemCount = 0 }) => {
  return (
    <div>
      <div id="header">
        <div className="left">
          <img src="./img/hamburger.svg" height="16px" />
        </div>
        <div className="middle">
          <Link to="landing">
            <img
              src="./img/farmopolisName.svg"
              height="30px"
              style={{ marginLeft: "23px" }}
            />
          </Link>
        </div>

        <div className="right">
          <div className="searchIcon">
            <img src="./img/search.svg" height="23px" />
          </div>
          <div className="shoppingCart">
            <div>{itemCount}</div>
            <Link to="shoppingCart">
              <img src="./img/shoppingCart.svg" height="23px" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
