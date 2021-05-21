import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutHeader from "./components/CheckoutHeader";
import ProduceTile from "./components/ProduceTile";
import Delivery from "./components/Delivery";

class Checkout extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleDeliveryOption = e => {
    let option = e.target.checked === true ? "on" : "off";
    this.props.setDelivery(option);
  };

  signIn = () => {
    this.props.history.push("./billing");
  };
  render() {
    const { items, itemCount, delivery } = this.props;
    const subtotal = items.reduce((acc, item) => {
      if (item.qty > 0) {
        acc += item.unitPrice * item.qty;
      }
      return acc;
    }, 0);
    const tax = Number.parseFloat(0.0725 * subtotal).toFixed(2);
    let deliveryTotal = delivery === "on" ? 8 : 0;
    const total = Number.parseFloat(+tax + subtotal + deliveryTotal).toFixed(2);
    return (
      <div>
        <CheckoutHeader itemCount={itemCount} />

        <div className="mainContent">
          {itemCount > 0 ? (
            <h2 className="underline">Chet's Farm</h2>
          ) : (
            <p className="bigText">
              {" "}
              Your cart is empty. Check out{" "}
              <Link to="landing" className="greenLink">
                <strong>produce</strong>
              </Link>
              .
            </p>
          )}

          {itemCount > 0 &&
            items.map(
              (item, index) =>
                item.qty > 0 && (
                  <div className="subtotalLine" key={`item${index}`}>
                    <span className="left">
                      {item.qty}
                      {item.unit}(s) {item.name}
                    </span>
                    <span className="right">
                      $
                      {Number.parseFloat(+item.qty * item.unitPrice).toFixed(2)}
                    </span>
                  </div>
                )
            )}

          {itemCount > 0 && (
            <div>
              <div className="spacer" />
              <Delivery
                toggleDeliveryOption={this.toggleDeliveryOption}
                toggleState={delivery}
              />
              <div className="spacer" />
              <div className="subtotalLine">
                <span className="left">
                  <strong>Subtotal:</strong>
                </span>
                <span className="right">
                  ${Number.parseFloat(subtotal).toFixed(2)}
                </span>
              </div>
              <div className="subtotalLine">
                <span className="left">
                  <strong>Tax:</strong>
                </span>
                <span className="right">${tax}</span>
              </div>
              <div className="subtotalLine noUnderline">
                <span className="left">
                  <strong>Total:</strong>
                </span>
                <span className="right">${total}</span>
              </div>
              <div className="spacer" />
              <hr />
              <div className="spacer" />
              <h2>
                Sign In or{" "}
                <Link className="greenLink" to="#">
                  Sign up
                </Link>
              </h2>
              <div className="spacer" />
              <form className="checkout" onSubmit={() => false}>
                <div>
                  <label htmlFor="email">Email</label>
                  <input type="text" id="email" name="email" />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input type="text" id="password" name="password" />
                </div>
                <div className="clearButtonBar">
                  <button type="button" className="greenBtn">
                    SIGN IN
                  </button>
                </div>
              </form>

              <div className="spacer" />
              <hr />
              <div className="spacer" />
              <h2>Continue as Guest</h2>
              <div className="spacer" />
              <div className="clearButtonBar">
                <button className="greenBtn" onClick={this.signIn}>
                  CONTINUE
                </button>
              </div>
              <p className="spacer" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    itemCount: state.itemCount,
    items: state.items,
    delivery: state.delivery
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setItems: items => {
      dispatch({ type: "SET_CART_ITEMS", items });
    },

    setDelivery: delivery => {
      dispatch({ type: "SET_DELIVERY", delivery });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
