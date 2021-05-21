import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import fetch from "axios";
import Rating from "./components/Rating";
import Header from "./components/Header";
import ProduceTile from "./components/ProduceTile";

class Farmer extends React.Component {
  constructor(props) {
    super(props);
  }

  getFarmInfo = async () => {
    if (this.props.itemCount > 0) return;
    let farmInfo = await import("../data/response");
    this.props.setItems(farmInfo.default.produce);
    this.props.setFarm(farmInfo.default.farmerDetails);
  };

  selectProduce = (e, item) => {
    let panes = document.getElementsByClassName("farmerProduceTiles");
    let buttons = document
      .getElementsByClassName("produce")[0]
      .getElementsByClassName("tabs")[0]
      .getElementsByTagName("button");
    Array.prototype.slice.call(buttons).map(button => {
      button.classList.remove("selected");
    });
    Array.prototype.slice.call(panes).map(pane => {
      pane.classList.remove("selected");
    });
    e.target.classList.add("selected");
    document.getElementById(item + "Pane").classList.add("selected");
  };

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

  componentDidMount() {
    this.getFarmInfo();
  }

  componentDidUpdate(prev) {}
  render() {
    const { itemCount, items, farmerDetails } = this.props;

    let fruits = this.props.items.filter(item => item.type === "fruit");
    let vegetables = this.props.items.filter(item => item.type === "vegetable");
    let others = this.props.items.filter(item => item.type === "other");

    return (
      <div>
        <Header itemCount={itemCount} />
        <div className="mainContent">
          <div className="breadCrumb">
            {" "}
            <Link to="farmerView">Farms</Link> &gt;{" "}
            <span>{farmerDetails.name}</span>
          </div>
          <div className="farmerInfo">
            <div className="row">
              <div className="header">
                <h1 className="noMargin">{farmerDetails.name}</h1>
                <Rating num={farmerDetails.rating} />
              </div>
              <div className="pic">
                <img src={farmerDetails.img} width="80px" />
              </div>
            </div>
            <div className="row">
              <h3>Location</h3>
              <div className="data">
                {farmerDetails.street}
                <br />
                {farmerDetails.city}, {farmerDetails.state}, {farmerDetails.zip}
              </div>
            </div>
            <div className="row">
              <h3>Hours</h3>
              <div className="data">
                {farmerDetails.hours &&
                  farmerDetails.hours.map((hours, index) => (
                    <div key={`hoursRow${index}`}>{hours}</div>
                  ))}
              </div>
            </div>
            <div className="row">
              <h3>Delivery</h3>
              <div className="data">
                {farmerDetails.delivery === true
                  ? "Delivery Offered"
                  : "Delivery Not Offered"}
              </div>
            </div>
          </div>
          <div className="spacer" />
          <div>
            <h3>Produce Available</h3>
          </div>
        </div>

        <div className="produce">
          <div className="tabs">
            <button
              onClick={e => this.selectProduce(e, "fruits")}
              className="selected"
            >
              Fruits
            </button>
            <button onClick={e => this.selectProduce(e, "vegetables")}>
              Vegetables
            </button>
            <button onClick={e => this.selectProduce(e, "others")}>
              Other
            </button>
          </div>
        </div>
        <div className="farmerProduceTiles selected" id="fruitsPane">
          {fruits.length &&
            fruits.map((fruit, index) => (
              <ProduceTile
                key={`fruit${index}`}
                type={fruit.type}
                name={fruit.name}
                price={fruit.price}
                unitPrice={fruit.unitPrice}
                img={fruit.img}
                id={fruit.id}
                qty={fruit.qty}
                unit={fruit.unit}
                updateButtonState={this.updateButtonState}
                buttonState={fruit.buttonState}
              />
            ))}
        </div>
        <div className="farmerProduceTiles" id="vegetablesPane">
          {vegetables.length &&
            vegetables.map((vegetable, index) => (
              <ProduceTile
                key={`vegetable${index}`}
                type={vegetable.type}
                name={vegetable.name}
                price={vegetable.price}
                unitPrice={vegetable.unitPrice}
                img={vegetable.img}
                id={vegetable.id}
                unit={vegetable.unit}
                qty={vegetable.qty}
                updateButtonState={this.updateButtonState}
                buttonState={vegetable.buttonState}
              />
            ))}
        </div>
        <div className="farmerProduceTiles" id="othersPane">
          {others.length &&
            others.map((other, index) => (
              <ProduceTile
                key={`other${index}`}
                type={other.type}
                name={other.name}
                price={other.price}
                unitPrice={other.unitPrice}
                img={other.img}
                id={other.id}
                unit={other.unit}
                qty={other.qty}
                updateButtonState={this.updateButtonState}
                buttonState={other.buttonState}
              />
            ))}
        </div>
        <div className="stickyButtonBar">
          <button className="orangeBtn" onClick={this.checkOut}>
            CHECKOUT
          </button>
          <button className="greenBtn" onClick={this.updateCart}>
            UPDATE CART
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items,
    itemCount: state.itemCount,
    farmerDetails: state.farmerDetails
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
    setFarm: farmerDetails => {
      dispatch({ type: "SET_FARM", farmerDetails: farmerDetails });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Farmer);
