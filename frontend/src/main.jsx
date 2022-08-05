import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import TripDetailsPage from "./screens/TripDetailsPage";
import AccommodationPage from "./screens/tripInformation/AccommodationPage";
import TransportationPage from "./screens/tripInformation/TransportationPage";
import Plans from "./screens/tripInformation/Plans";
import Restoration from "./screens/tripInformation/Restoration";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<App />}></Route>
        <Route path="/trip/:tripId" exact element={<TripDetailsPage />} />
        <Route
          path="/trip/:tripId/accommodation"
          exact
          element={<AccommodationPage />}
        ></Route>
        <Route
          path="/trip/:tripId/transportation"
          exact
          element={<TransportationPage />}
        ></Route>
        <Route path="/trip/:tripId/plans" exact element={<Plans />}></Route>
        <Route
          path="/trip/:tripId/restoration"
          exact
          element={<Restoration />}
        ></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
