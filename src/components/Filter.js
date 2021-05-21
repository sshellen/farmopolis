import React from "react";
import ItemList from "../Resources/ItemList";
import { connect } from "react-redux";
import FilterOption from "./FilterOption";

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.locationInput = React.createRef();
    this.deliveryInput = React.createRef();
    this.itemInput = React.createRef();
    this.state = {
      showFilter: "",
      items: [],
      filterOptions: []
    };
  }

  openFilter = (e, btn) => {
    e.preventDefault();
    let el = e.target;

    let buttons = Array.prototype.slice.call(
      document.getElementsByClassName("drkGryBtn")
    );

    buttons.map(btn => {
      btn.classList.remove("toggledOn");
    });

    if (this.state.showFilter !== btn) {
      this.setState({ showFilter: btn }, () => {
        this.props.handleClick("show");
        if (btn === "item") this.getItems();
      });
      el.classList.add("toggledOn");
    } else {
      this.setState({ showFilter: "" }, () => {
        this.props.handleClick("hide");
      });
    }
  };

  closeFilters = () => {
    let buttons = Array.prototype.slice.call(
      document.getElementsByClassName("drkGryBtn")
    );

    buttons.map(btn => {
      btn.classList.remove("toggledOn");
    });

    this.setState({ showFilter: "" }, () => {
      this.props.handleClick("hide");
    });
  };

  getItemsByType = () => {
    return new Promise((resolve, reject) => {
      let items = [];
      setTimeout(() => {
        items = ItemList(this.props.produce);
        resolve(items);
      }, 300);
    });
  };

  getItems = async () => {
    let items = await this.getItemsByType();
    this.setState({ items });
  };

  toggleDeliveryOption = e => {
    let option = e.target.checked;
    let toggleSwitch = document.getElementById("deliveryOfferedToggle");
    if (option === true) {
      toggleSwitch.classList.remove("off");
      toggleSwitch.classList.add("on");
    } else {
      toggleSwitch.classList.remove("on");
      toggleSwitch.classList.add("off");
    }
  };

  toggleItem = e => {
    let itemSelected = e.target.checked;
    if (itemSelected === true) {
      e.target.parentNode.classList.add("selected");
    } else {
      e.target.parentNode.classList.remove("selected");
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.closeFilters();

    if (e.target.name === "locationForm") {
      this.addFilter({
        name: "Location",
        desc: this.locationInput.current.value
      });
    } else if (e.target.name === "deliveryForm") {
      this.addFilter({
        name: "Delivery",
        desc:
          this.deliveryInput.current.checked === true
            ? "Offered"
            : "Not Offered"
      });
    } else if (e.target.name === "itemForm") {
      let formEls = e.target.getElementsByTagName("input");
      let checkedItems = Array.prototype.slice
        .call(formEls)
        .reduce((acc, val, ind) => {
          if (val.checked === true) {
            acc += val.name + " ";
          }
          return acc;
        }, "");
      this.addFilter({
        name: "Items",
        desc: checkedItems
      });
    }
  };

  filterOut = filter => {
    let filters = this.props.filters.filter(obj => {
      return obj.name !== filter.name;
    });
    return filters;
  };

  addFilter = filter => {
    let filters =
      this.props.filters.length > 0
        ? [...this.filterOut(filter), filter]
        : [filter];
    this.props.updateFilters(filters);
  };

  removeFilter = filter => {
    let filters = this.filterOut(filter);
    this.props.updateFilters(filters);
  };

  render() {
    const {
      handleClick,
      produce,
      filters: []
    } = this.props;
    return (
      <div className="filter">
        <h3 className="filtersHeading">FILTERS</h3>
        <div className="filterBtnRow">
          <button
            className="drkGryBtn"
            onClick={e => this.openFilter(e, "location")}
          >
            LOCATION
          </button>
          <button
            className="drkGryBtn"
            onClick={e => this.openFilter(e, "delivery")}
          >
            DELIVERY
          </button>
          <button
            className="drkGryBtn"
            onClick={e => this.openFilter(e, "item")}
          >
            ITEM TYPE
          </button>
        </div>
        {this.props.filters.map((option, index) => (
          <FilterOption
            key={`filterOption${index}`}
            name={option.name}
            desc={option.desc}
            handleClick={this.removeFilter}
          />
        ))}

        <hr className="filterHR" />

        {this.state.showFilter === "location" && (
          <div className="filterBox">
            <form name="locationForm" onSubmit={this.handleSubmit}>
              <div className="formRow">
                <label>Location</label>
                <input
                  type="text"
                  name="Location"
                  ref={this.locationInput}
                  defaultValue=""
                  placeholder="City, State or Zip Code"
                />
              </div>
              <div className="buttonBar">
                <button
                  className="orangeBtn"
                  onClick={e => this.openFilter(e, "location")}
                >
                  Cancel
                </button>
                <button className="greenBtn" type="submit">
                  Apply
                </button>
              </div>
            </form>
          </div>
        )}
        {this.state.showFilter === "delivery" && (
          <div className="filterBox">
            <form onSubmit={this.handleSubmit} name="deliveryForm">
              <div className="formRow">
                <label className="toggle">
                  <div className="label">Delivery Offered</div>
                  <div className="toggleSwitch off" id="deliveryOfferedToggle">
                    <div className="handle" />
                    <input
                      type="checkbox"
                      name="Delivery"
                      ref={this.deliveryInput}
                      className="visuallyHidden"
                      onChange={e => {
                        this.toggleDeliveryOption(e);
                      }}
                    />
                  </div>
                </label>
              </div>
              <div className="buttonBar">
                <button
                  className="orangeBtn"
                  onClick={e => this.openFilter(e, "delivery")}
                >
                  Cancel
                </button>
                <button className="greenBtn" type="submit">
                  Apply
                </button>
              </div>
            </form>
          </div>
        )}
        {this.state.showFilter === "item" && (
          <div className="filterBox">
            <form
              onSubmit={this.handleSubmit}
              name="itemForm"
              ref={this.itemInput}
            >
              {this.state.items.map((item, index) => (
                <div className="formRow" key={`item${index}`}>
                  <label className="productSelection">
                    {item}
                    <input
                      type="checkbox"
                      name={item}
                      className="visuallyHidden"
                      onChange={e => {
                        this.toggleItem(e);
                      }}
                    />
                  </label>
                </div>
              ))}
              <div className="buttonBar">
                <button
                  className="orangeBtn"
                  onClick={e => this.openFilter(e, "item")}
                >
                  Cancel
                </button>
                <button className="greenBtn" type="submit" type="submit">
                  Apply
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    produce: state.produce,
    filters: state.filters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateFilters: filters => dispatch({ type: "UPDATE_FILTERS", filters })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
