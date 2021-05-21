import { handleActions } from "redux-actions";
const SET_FARMS = "SET_FARMS";
const GET_PRODUCE = "GET_PRODUCE";
const SET_PRODUCE = "SET_PRODUCE";
const SET_CART_ITEMS = "SET_CART_ITEMS";
const FETCH_FARMS = "FETCH_FARMS";
const GET_FARM = "FETCH_FARM";
const SET_FARM = "SET_FARM";
const SET_FARM_ID = "SET_FARM_ID";
const UPDATE_FILTERS = "UPDATE_FILTERS";
const SET_ITEM_COUNT = "SET_ITEM_COUNT";
const SET_DELIVERY = "SET_DELIVERY";

const initialState = {
  farms: [],
  farmerDetails: {},
  produceType: "Produce",
  produce: ["All Produce"],
  location: "",
  farmId: "",
  filters: [],
  items: [],
  itemCount: 0,
  error: null,
  delivery: "off"
};

const farmReducer = handleActions(
  {
    [SET_PRODUCE]: (state, action) => ({
      ...state,
      location: action.location,
      produceType: action.produceType,
      produce: action.produce
    }),
    [GET_PRODUCE]: (state, action) => ({
      ...state
    }),
    [SET_FARMS]: (state, action) => ({
      ...state,
      farms: action.farms
    }),
    [FETCH_FARMS]: (state, action) => ({
      ...state
    }),
    [GET_FARM]: (state, action) => ({
      ...state
    }),
    [SET_FARM_ID]: (state, action) => ({
      ...state,
      farmId: action.farmId
    }),
    [UPDATE_FILTERS]: (state, action) => ({
      ...state,
      filters: action.filters
    }),
    [SET_CART_ITEMS]: (state, action) => ({
      ...state,
      items: action.items
    }),
    [SET_ITEM_COUNT]: (state, action) => ({
      ...state,
      itemCount: action.itemCount
    }),
    [SET_FARM]: (state, action) => ({
      ...state,
      farmerDetails: action.farmerDetails
    }),
    [SET_DELIVERY]: (state, action) => ({
      ...state,
      delivery: action.delivery
    })
  },
  initialState
); // End of handle actions

export default farmReducer;
