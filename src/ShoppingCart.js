import React from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import Delivery from "./components/Delivery";
import ProduceTile from "./components/ProduceTile";
import { connect } from "react-redux";

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
  }

  updateButtonState = (id, buttonState) => {
    let items = this.props.items;
    let updatedItems = items.map(item => {
      if (item.id === id) {
        item.buttonState = buttonState;
      }
      return item;
    });

    this.props.setItems(updatedItems);
  };

  updateCart = () => {
    let qtys = document.getElementsByClassName("quantity");
    let itemCount = 0;
    let items = [];
    Array.prototype.slice.call(qtys).map(form => {
      let formData = Array.prototype.slice.call(form).reduce((acc, input) => {
        let name = input.name;

        if (name === "qty" && +input.value > 0) {
          itemCount += 1;

          acc.readOnly = true;
        }

        if (name === "readOnly" && input.value === false) {
          acc.readOnly = false;
        }
        acc[name] = input.value;
        return acc;
      }, {});

      items = items.concat(formData);
    });
    this.props.setItemCount(itemCount);
    this.props.setItems(items);
  };

  checkOut = () => {
    this.props.history.push("./checkout");
  };

  toggleDeliveryOption = e => {
    let option = e.target.checked === true ? "on" : "off";
    this.props.setDelivery(option);
  };

  render() {
    const { itemCount, items, delivery } = this.props;
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
        <Header itemCount={itemCount} />
        <div className="mainContent">
          <h1>Shopping Cart</h1>
          {itemCount > 0 && <h3 className="underline">Chet's Farm</h3>}

          {itemCount > 0 &&
            items.map(
              (item, index) =>
                item.qty > 0 && (
                  <ProduceTile
                    key={`item${index}`}
                    type={item.type}
                    name={item.name}
                    price={item.price}
                    unitPrice={item.unitPrice}
                    img={item.img}
                    id={item.id}
                    unit={item.unit}
                    qty={item.qty}
                    readOnly={item.readOnly}
                    updateButtonState={this.updateButtonState}
                    buttonState={item.buttonState}
                  />
                )
            )}
          {itemCount > 0 && (
            <div>
              <Delivery
                toggleDeliveryOption={this.toggleDeliveryOption}
                toggleState={delivery}
              />
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
              <div className="subtotalLine">
                <span className="left">
                  <strong>Total:</strong>
                </span>
                <span className="right">${total}</span>
              </div>
            </div>
          )}

          {itemCount === 0 && (
            <p className="bigText">
              Your cart is empty. Check out{" "}
              <Link to="landing" className="greenLink">
                <strong>produce</strong>
              </Link>
            </p>
          )}
        </div>
        {itemCount > 0 && (
          <div className="clearButtonBar">
            <button className="orangeBtn" onClick={this.checkOut}>
              CHECKOUT
            </button>
            <button className="greenBtn" onClick={this.updateCart}>
              UPDATE CART
            </button>
          </div>
        )}
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
    setItemCount: itemCount => {
      dispatch({ type: "SET_ITEM_COUNT", itemCount });
    },
    setDelivery: delivery => {
      dispatch({ type: "SET_DELIVERY", delivery });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart);
