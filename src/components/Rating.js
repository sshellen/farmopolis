import React from "react";

const Rating = ({ num }) => {
  return (
    <div className={`${num} barns`}>
      <img src="./img/barns.svg" />
    </div>
  );
};

export default Rating;
