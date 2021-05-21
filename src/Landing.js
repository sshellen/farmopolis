import React from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPageChunk from "./components/landingPageChunk";
import { connect } from "react-redux";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.fruitTiles = [
      { image: "./img/berries.png", text: "Berries" },
      { image: "./img/pits.jpg", text: "Pits" },
      { image: "./img/apples.jpg", text: "Apples and Pears" },
      { image: "./img/citrus.jpg", text: "Citrus" },
      { image: "./img/tropical.jpg", text: "Tropical" },
      { image: "./img/melons.jpg", text: "Melons" }
    ];
    this.vegieTiles = [
      { image: "./img/bulbs.jpg", text: "Bulbs" },
      { image: "./img/stems.jpg", text: "Stems" },
      { image: "./img/fungi.jpg", text: "Fungi" },
      { image: "./img/legumes.jpg", text: "Legumes" },
      { image: "./img/leaves.jpg", text: "Leaves" },
      { image: "./img/roots.jpg", text: "Roots" }
    ];
    this.otherTiles = [
      { image: "./img/milk.jpg", text: "Milk" },
      { image: "./img/honey.png", text: "Honey" },
      { image: "./img/nuts.jpg", text: "Nuts" },
      { image: "./img/grains.png", text: "Grains" },
      { image: "./img/eggs.jpg", text: "Eggs" },
      { image: "./img/oils.jpg", text: "Oils" }
    ];
  }

  setFarms = (produceType, produce) => {
    this.props.setProduce("", produceType, produce);
    this.props.history.push("./farmerView");
  };

  componentDidMount() {
    this.props.setDelivery("off");
    this.props.setItemCount(0);
  }

  render() {
    return (
      <div>
        <Header />

        <form className="mainContent">
          <p className="summary">
            Find organic produce from an urban farm near you.
          </p>
          <div className="spacer" />
          <h1 className="noMargin">Search for a farm near you</h1>
          <div className="spacer" />
          <div className="farmSearch">
            <input type="text" placeholder="City or Zip Code" />
            <input
              type="submit"
              value="GO"
              onClick={() => this.props.history.push("/farmerView")}
            />
          </div>
          <hr />
          <h1>Select Produce</h1>
          <div className="cta">
            <Link to="farmerView" className="large right">
              FARMS WITH PRODUCE
            </Link>
          </div>
          <hr />
          <div className="cta">
            <div className="title">Fruits</div>
            <Link to="farmerView" className="medium right">
              FARMS WITH FRUITS
            </Link>
          </div>
          <div className="produceTiles">
            {this.fruitTiles.map((tile, index) => (
              <LandingPageChunk
                key={`fruit${index}`}
                img={tile.image}
                text={tile.text}
                onClickHandler={e => this.setFarms("Fruits", tile.text)}
              />
            ))}
          </div>

          <hr className="noTopMargin" />
          <div className="cta">
            <div className="title">Vegetables</div>
            <Link to="farmerView" className="medium right">
              FARMS WITH VEGETABLES
            </Link>
          </div>
          <div className="produceTiles">
            {this.vegieTiles.map((tile, index) => (
              <LandingPageChunk
                key={`vegie${index}`}
                img={tile.image}
                text={tile.text}
                onClickHandler={e => this.setFarms("Vegetables", tile.text)}
              />
            ))}
          </div>

          <hr className="noTopMargin" />
          <div className="cta">
            <div className="title">Other</div>
            <Link to="farmerView" className="medium right">
              FARMS WITH OTHER
            </Link>
          </div>
          <div className="produceTiles">
            {this.otherTiles.map((tile, index) => (
              <LandingPageChunk
                key={`other${index}`}
                img={tile.image}
                text={tile.text}
                onClickHandler={e => this.setFarms("Other", tile.text)}
              />
            ))}
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setProduce: (location, produceType, produce) => {
      dispatch({ type: "SET_PRODUCE", location, produceType, produce });
    },
    setDelivery: delivery => {
      dispatch({ type: "SET_DELIVERY", delivery });
    },
    setItemCount: itemCount => {
      dispatch({ type: "SET_ITEM_COUNT", itemCount });
    }
  };
};

export default connect(
  "",
  mapDispatchToProps
)(Landing);
