import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ModelProvider } from "./model";
import "./index.css";
import App from "./App";
import TripDetailsPage from "./screens/TripDetailsPage";
import AccommodationPage from "./screens/tripInformation/AccommodationPage";
import TransportationPage from "./screens/tripInformation/TransportationPage";
import PlansPage from "./screens/tripInformation/PlansPage";
import RestorationPage from "./screens/tripInformation/RestorationPage";
import ProtectedRoute from "./screens/ProtectedRoute";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModelProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<App />}></Route>
          <Route
            path="/trip/:tripId"
            exact
            element={
              <ProtectedRoute>
                <TripDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trip/:tripId/accommodation"
            exact
            element={
              <ProtectedRoute>
                <AccommodationPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/trip/:tripId/transportation"
            exact
            element={
              <ProtectedRoute>
                <TransportationPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/trip/:tripId/plans"
            exact
            element={
              <ProtectedRoute>
                <PlansPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/trip/:tripId/restoration"
            exact
            element={
              <ProtectedRoute>
                <RestorationPage />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </ModelProvider>
  </React.StrictMode>
);
