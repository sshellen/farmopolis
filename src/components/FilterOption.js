import React from "react";

const FilterOption = ({ name, desc, handleClick }) => {
  return (
    <div className="filterOption">
      <span className="filterName">{name}:</span>
      <span className="filterDesc">{desc}</span>
      <img
        src="./img/removeFilter.png"
        className="closeFilter"
        onClick={() => handleClick({ name, desc })}
      />
    </div>
  );
};

export default FilterOption;
