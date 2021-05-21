import React from "react";
import { Link } from "react-router-dom";

const CheckoutHeader = ({ itemCount = 0 }) => {
  return (
    <div>
      <div id="header">
        <div className="left">
          <Link to="Landing">
            <img src="./img/farmopolisShroom.svg" height="23px" />
          </Link>
        </div>
        <div className="middle">
          <h1>CHECKOUT</h1>
        </div>

        <div className="right">
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

export default CheckoutHeader;
