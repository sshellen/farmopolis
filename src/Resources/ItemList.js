const ItemList = item => {
  switch (item) {
    case "Berries":
      return ["Raspberries", "Blueberries", "Strawberries"];
      break;
    case "Apples and Pears":
      return [
        "Granny Smith",
        "Golden Delicious",
        "Red Delicious",
        "Fuji Apples"
      ];
      break;
    default:
      return ["Carrots", "Asparagus", "Rhubarb"];
      break;
  }
};

export default ItemList;
