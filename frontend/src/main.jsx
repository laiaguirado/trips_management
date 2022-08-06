import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import TripDetailsPage from "./screens/TripDetailsPage";
import AccommodationPage from "./screens/tripInformation/AccommodationPage";
import TransportationPage from "./screens/tripInformation/TransportationPage";
import PlansPage from "./screens/tripInformation/PlansPage";
import RestorationPage from "./screens/tripInformation/RestorationPage";

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
        <Route path="/trip/:tripId/plans" exact element={<PlansPage />}></Route>
        <Route
          path="/trip/:tripId/restoration"
          exact
          element={<RestorationPage />}
        ></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
