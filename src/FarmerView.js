import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Map from "./components/Map";
import Rating from "./components/Rating";
import FilterOption from "./components/FilterOption";
const topMargin = 20;
const leftMargin = 20;
class FarmerView extends React.Component {
  constructor(props) {
    super(props);
    this.mask = document.createElement("div");
    this.mask.classList.add("mask");
  }

  getFarms = () => {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          let farms = [
            {
              name: "Chet's",
              id: 1000,
              street: "258 Rooster Woods Road",
              city: "San Francisco",
              state: "CA",
              zip: "94121",
              rating: "five"
            },
            {
              name: "Happy Farms",
              id: 1001,
              street: "728 Goldfinch Ln",
              city: "San Francisco",
              state: "CA",
              zip: "94132",
              rating: "three"
            },
            {
              name: "City Vine",
              id: 1002,
              street: "323 Grapeseed Rd",
              city: "San Francisco",
              state: "CA",
              zip: "94125",
              rating: "four"
            },
            {
              name: "Urban Farm House",
              id: 1003,
              street: "459  Datenut Ln",
              city: "San Francisco",
              state: "CA",
              zip: "94142",
              rating: "four"
            }
          ];
          resolve(farms);
        },

        500
      );
    });
  };

  setFarms = async () => {
    let farms = await this.getFarms();
    this.props.setFarms(farms);
    this.chunk = document.getElementById("mapAndList");
    this.chunkHeight = getComputedStyle(this.chunk).height;
    this.chunkWidth = getComputedStyle(this.chunk).width;
  };

  setMask = state => {
    this.mask.style.height = this.chunkHeight;
    this.mask.style.top = this.chunk.getBoundingClientRect().y + "px";
    this.mask.style.left = "0px";
    if (state === "show") {
      this.chunk.appendChild(this.mask);
      this.body.style.position = "fixed";
    } else {
      this.mask.remove();
      this.body.style.position = "relative";
    }
  };

  setFarm = farmId => {
    this.props.setFarmId(farmId);
    this.props.history.push("./farmer");
  };

  componentDidMount() {
    this.setFarms();
    this.body = document.getElementById("body");
  }

  render() {
    const { farms, produceType, produce } = this.props;
    return (
      <div id="body">
        <Header />
        <div className="mainContent">
          <div className="breadCrumb">
            <Link to="Landing">{produceType}</Link> &gt;{" "}
            <strong>{produce}</strong>
          </div>
          <h1>Choose from a farm below</h1>

          <Filter handleClick={this.setMask} />

          <div id="mapAndList">
            <Map />
            <ol className="farmersList">
              {farms.map((farm, index) => (
                <li className="" key={`farm${index}`}>
                  <div className="header">
                    <h3>
                      <a href="#" onClick={e => this.setFarm(farm.id)}>
                        {farm.name}
                      </a>
                    </h3>
                    <Rating num={farm.rating} />
                  </div>
                  {farm.street}
                  <br />
                  {farm.city}, {farm.state} {farm.zip}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="spacer" />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setFarms: farms => dispatch({ type: "SET_FARMS", farms }),
    setFarmId: farmId => dispatch({ type: "SET_FARM_ID", farmId })
  };
};

const mapStateToProps = state => {
  return {
    farms: state.farms,
    produce: state.produce,
    produceType: state.produceType
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FarmerView);
