import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import Loader from "./components/Loader";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./Reducers/reducers";

const { BrowserRouter, Route, Switch } = require("react-router-dom");

const store = createStore(reducers);

const Splash = lazy(() => import("./Splash"));
const Landing = lazy(() => import("./Landing"));
const FarmerView = lazy(() => import("./FarmerView"));
const Farmer = lazy(() => import("./Farmer"));
const ShoppingCart = lazy(() => import("./ShoppingCart"));
const Checkout = lazy(() => import("./Checkout"));
const Receipt = lazy(() => import("./Receipt"));
const Billing = lazy(() => import("./Billing"));

const Routes = (
  <BrowserRouter>
    <Suspense fallback=<Loader />>
      <Switch>
        <Route path="/" exact component={Splash} />
        <Route path="/landing" component={Landing} />
        <Route path="/farmerView" component={FarmerView} />
        <Route path="/farmer" component={Farmer} />
        <Route path="/shoppingCart" component={ShoppingCart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/billing" component={Billing} />
        <Route path="/receipt" component={Receipt} />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

ReactDOM.render(
  <Provider store={store}>{Routes}</Provider>,
  document.getElementById("app")
);
