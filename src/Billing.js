import React from "react";
import CheckoutHeader from "./components/CheckoutHeader";
import { connect } from "react-redux";

class Billing extends React.Component {
  constructor(props) {
    super(props);
  }

  placeOrder = () => {
    this.props.history.push("./receipt");
  };
  render() {
    const { delivery, itemCount } = this.props;
    return (
      <div>
        <CheckoutHeader itemCount={itemCount} />
        <div className="mainContent">
          <form name="billing" className="checkout" onSubmit={() => false}>
            <h2 className="underline">Billing Information</h2>

            <div>
              <label htmlFor="creditCardName">Name on Credit Card</label>
              <input type="text" id="creditCardName" name="name" />
            </div>
            <div>
              <label htmlFor="billingStreetAddress">Street Address</label>
              <input type="text" id="billingStreetAddress" name="address" />
            </div>
            <div>
              <label htmlFor="billingSuiteNumber">Apartment/Suite Number</label>
              <input type="text" id="billingSuiteNumber" name="suiteNumber" />
            </div>
            <div>
              <label htmlFor="billingCity">City</label>
              <input type="text" id="billingCity" name="city" />
            </div>
            <div>
              <label htmlFor="billingState">State</label>
              <select id="billingState" name="State">
                <option name="AK">AK</option>
                <option name="AL">AL</option>
                <option name="AR">AR</option>
              </select>
            </div>

            <div>
              <label htmlFor="billingZipCode">City</label>
              <input type="text" id="billingZipCode" name="zip" />
            </div>

            <div>
              <label htmlFor="billingCCNumber">Credit Card Number</label>
              <input type="text" id="billingCCNumber" name="CCNumber" />
            </div>

            <div>
              <label htmlFor="billinExpiration">Expiration Number</label>
              <input
                type="text"
                id="billinExpiration"
                name="expiration"
                placeholder="MM/DD/YYY"
              />
            </div>

            <div>
              <label htmlFor="billingCVV">CVV Number</label>
              <input type="text" id="billingCVV" name="expiration" />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input type="text" id="email" name="email" />
            </div>
            {delivery === "on" ? (
              <div>
                <h2 className="underline">Shipping Information</h2>

                <div>
                  <label htmlFor="shippingStreetAddress">Street Address</label>
                  <input
                    type="text"
                    id="shippingStreetAddress"
                    name="address"
                  />
                </div>
                <div>
                  <label htmlFor="shippingSuiteNumber">
                    Apartment/Suite Number
                  </label>
                  <input
                    type="text"
                    id="shippingSuiteNumber"
                    name="suiteNumber"
                  />
                </div>
                <div>
                  <label htmlFor="shippingCity">City</label>
                  <input type="text" id="shippingCity" name="city" />
                </div>
                <div>
                  <label htmlFor="shippingState">State</label>
                  <select id="shippingState" name="State">
                    <option name="AK">AK</option>
                    <option name="AL">AL</option>
                    <option name="AR">AR</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="shippingZipCode">City</label>
                  <input type="text" id="shippingZipCode" name="zip" />
                </div>
              </div>
            ) : (
              <div>
                <div className="spacer" />
                <hr />
                <div className="spacer" />
                <h2 className="underline">Billing Information</h2>
                <div>
                  Either You chose not to have any of your items delivered, or
                  the farmer that you are purchasing from doesn't offer delivery
                  service. In these cases no shipping address is necessary.
                </div>
              </div>
            )}
          </form>
          <div className="spacer" />
          <hr />
          <div className="spacer" />
          <div className="clearButtonBar">
            <button className="greenBtn" onClick={this.placeOrder}>
              PLACE ORDER
            </button>
          </div>

          <div className="spacer" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    delivery: state.delivery,
    itemCount: state.itemCount
  };
};

export default connect(
  mapStateToProps,
  ""
)(Billing);
