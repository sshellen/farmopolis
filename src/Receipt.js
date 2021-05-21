import React from "react";
import CheckoutHeader from "./components/CheckoutHeader";
import { connect } from "react-redux";

const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec"
};

class Receipt extends React.Component {
  constructor(props) {
    super(props);
  }

  isEmpty = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  };

  backToProduce = () => {
    this.props.history.push("./landing");
  };
  getDate = () => {
    let today = new Date();
    let pickupDate = new Date();
    pickupDate.setDate(today.getDate() + 2);
    return `${
      months[pickupDate.getMonth()]
    }  ${pickupDate.getDate()} ${pickupDate.getFullYear()}`;
  };
  render() {
    const { farmerDetails, items, itemCount, delivery } = this.props;

    return (
      <div>
        <CheckoutHeader itemCount={0} />
        <div className="mainContent">
          <h2>Thanks for your order.</h2>
          <p>
            Below are details of your order. If your items are not being
            delivered, we’ve listed the addresses of where you can pick up.
          </p>
          <p>You’ll also be receiving an email with order details as well.</p>
          <div className="spacer" />
          <h2 className="underline">Farms</h2>
          {this.isEmpty(farmerDetails) !== true && (
            <h3>{farmerDetails.name}</h3>
          )}
          <div className="spacer" />
          {itemCount > 0 && <h3>Items</h3>}
          <ul className="itemsList">
            {itemCount > 0 &&
              items.map(
                (item, index) =>
                  item.qty > 0 && (
                    <li key={`item${index}`}>
                      {item.qty}
                      {item.unit}(s) {item.name}
                    </li>
                  )
              )}
          </ul>

          <div className="spacer" />
          {itemCount > 0 && delivery === "off" && (
            <div>
              <h3>Location</h3>
            </div>
          )}
          {delivery === "off" && this.isEmpty(farmerDetails) !== true && (
            <div>
              <div>{farmerDetails.street}</div>
              <div>
                {farmerDetails.city}, {farmerDetails.state}
              </div>
            </div>
          )}
          <div className="spacer" />
          {itemCount > 0 && delivery === "off" && (
            <div>
              <h3>Estimated day to pick up</h3>
              <div>{this.getDate()}</div>
            </div>
          )}
        </div>

        <div className="clearButtonBar">
          <button className="greenBtn" onClick={this.backToProduce}>
            BACK TO PRODUCE
          </button>
        </div>
        <div className="spacer" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items,
    itemCount: state.itemCount,
    farmerDetails: state.farmerDetails,
    delivery: state.delivery
  };
};

export default connect(
  mapStateToProps,
  ""
)(Receipt);
