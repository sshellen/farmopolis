import React from "react";

const Delivery = ({ toggleState = "off", toggleDeliveryOption }) => {
  return (
    <div className="deliveryLine">
      <label className="toggle">
        <div className="label">
          <strong>Delivery:</strong>
        </div>
        <div
          className={`toggleSwitch ${toggleState}`}
          id="deliveryOfferedToggle"
        >
          <div className="handle" />
          <input
            type="checkbox"
            name="Delivery"
            className="visuallyHidden"
            onChange={e => {
              {
                toggleDeliveryOption(e);
              }
            }}
          />
        </div>
      </label>
      <div className="deliveryTotal">
        {toggleState === "on" ? (
          <span>$8.00</span>
        ) : (
          <span>
            $0.00
            <br />
            (pick-up)
          </span>
        )}
      </div>
    </div>
  );
};

export default Delivery;
