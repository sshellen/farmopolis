import React from "react";

const Loader = ({ show = true }) => {
  return (
    <div className="spinner">
      <img src="/img/spinner.svg" />
    </div>
  );
};

export default Loader;
