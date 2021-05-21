import React, { useState, useEffect } from "react";

const ProduceTile = ({
  type = "",
  name = "",
  price = "",
  unit = "",
  unitPrice = "",
  img = "",
  id = "",
  readOnly = false,
  qty = 0,
  updateButtonState,
  buttonState = ""
}) => {
  /* const [value, setValue] = useState("");
  const [buttonState, setButtonState] = useState("editState");

  const updateState = state => {
    setButtonState(state);
  };*/

  return (
    <div className="farmerProduceTile">
      <div className="description">
        <div className="type">
          <h2>{name}</h2>
          <div>{price}</div>
        </div>
        <div className="img">
          <img src={img} />
        </div>
      </div>
      <form className="quantity" onSubmit={() => false}>
        {+qty === 0 || buttonState === "" ? (
          <div>
            <label labelfor={id}>Quantity:</label>
            <input type="text" name="qty" defaultValue={qty} maxsize="6" />
            <input type="hidden" name="buttonState" value="editState" />
            <span>&nbsp;{unit}(s)</span>
          </div>
        ) : buttonState === "editState" ? (
          <div>
            <span>
              <strong>Quantity:</strong> {qty}
            </span>{" "}
            &nbsp;{unit}
            <input type="hidden" name="qty" defaultValue={qty} />
            <input type="hidden" name="buttonState" value="editState" />
            <button
              className="darkGrayBtn"
              onClick={() => updateButtonState(id, "cancelState")}
            >
              EDIT
            </button>
            <div>
              {" "}
              <strong>Total:</strong> $
              {Number.parseFloat(unitPrice * qty).toFixed(2)}
            </div>
          </div>
        ) : (
          <div>
            <label labelfor={id}>Quantity:</label>
            <input type="text" name="qty" defaultValue={qty} />
            <input type="hidden" name="buttonState" value="editState" />
            <button
              className="darkGrayBtn"
              onClick={() => updateButtonState(id, "editState")}
            >
              CANCEL
            </button>
          </div>
        )}
        <input type="hidden" name="type" value={type} />
        <input type="hidden" name="name" value={name} />
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="price" value={price} />
        <input type="hidden" name="unit" value={unit} />
        <input type="hidden" name="unitPrice" value={unitPrice} />
        <input type="hidden" name="img" value={img} />
      </form>
    </div>
  );
};

export default ProduceTile;
