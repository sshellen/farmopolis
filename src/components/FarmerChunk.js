import React from "react";

const FarmerChunk = ({ img, text }) => {
  return (
    <div className="landingChunk">
      <div>
        <img src={img} />
      </div>
      <span>{text}</span>
    </div>
  );
};

export default FarmerChunk;
