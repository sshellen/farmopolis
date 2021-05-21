const response = {
  farmerDetails: {
    name: "Chet's Farm",
    img: "./img/chetsProfileImg.png",
    id: 1000,
    street: "258 Rooster Woods Road",
    city: "San Francisco",
    state: "CA",
    zip: "94121",
    hours: ["MON-FRI: 10am-5pm", "SAT: 11am-3pm", "SUN: Closed"],
    delivery: true,
    rating: "five"
  },
  produce: [
    {
      id: 10,
      name: "Red, delicious apples",
      price: "$1.80/lb",
      unitPrice: 1.8,
      img: "./img/redApples.png",
      unit: "lb",
      type: "fruit",
      readOnly: false
    },
    {
      id: 11,
      name: "Granny Smith Apples",
      price: "$1.90/lb",
      unitPrice: 1.9,
      img: "./img/grannySmith.png",
      unit: "lb",
      type: "fruit",
      readOnly: false
    },
    {
      id: 12,
      name: "Bartlett Pears",
      price: "$1.60/lb",
      unitPrice: 1.6,
      img: "./img/bartlettPears.png",
      unit: "lb",
      type: "fruit",
      readOnly: false
    },

    {
      id: 21,
      name: "Spinach",
      price: "$4.90/lb",
      unitPrice: 4.9,
      img: "./img/spinach.png",
      unit: "lb",
      type: "vegetable",
      readOnly: false
    },
    {
      id: 22,
      name: "Asparagus",
      price: "$9.80/lb",
      unitPrice: 9.8,
      img: "./img/asparagus.png",
      unit: "lb",
      type: "vegetable",
      readOnly: false
    },
    {
      id: 23,
      name: "corn",
      price: "$3.00/lb",
      unitPrice: 3.0,
      unit: "lb",
      img: "./img/corn.png",
      type: "vegetable",
      readOnly: false
    },

    {
      id: 31,
      name: "Duck Eggs",
      price: "$6.00/half dozen carton",
      unitPrice: 6.0,
      unit: "lb",
      img: "./img/duckEggs.png",
      unit: "carton",
      type: "other",
      readOnly: false
    },
    {
      id: 32,
      name: "Pistacios",
      price: "$2.00/lb",
      unitPrice: 2.0,
      img: "./img/pistachios.png",
      unit: "lb",
      type: "other",
      readOnly: false
    },
    {
      id: 33,
      name: "Honey",
      price: "$15.00/2 lb jar",
      unitPrice: 15.0,
      img: "./img/honey.png",
      unit: "jar",
      type: "other",
      readOnly: false
    }
  ]
};

export default response;
