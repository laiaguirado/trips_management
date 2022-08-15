import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ModelProvider } from "./model";
import "./index.css";
import App from "./App";
import TripDetailsPage from "./screens/TripDetailsPage";
import AccommodationPage from "./screens/tripInformation/Accommodation/AccommodationPage";
import TransportationPage from "./screens/tripInformation/Transportation/TransportationPage";
import PlansPage from "./screens/tripInformation/Plans/PlansPage";
import RestorationPage from "./screens/tripInformation/Restoration/RestorationPage";
import ProtectedRoute from "./screens/ProtectedRoute";
import AccommodationDetailsPage from "./screens/tripInformation/Accommodation/AccommodationDetailsPage";
import PlansDetailsPage from "./screens/tripInformation/Plans/PlansDetailsPage";

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
            path="/trip/:tripId/accommodation/:accommodationId"
            exact
            element={
              <ProtectedRoute>
                <AccommodationDetailsPage />
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
            path="/trip/:tripId/plans/:planId"
            exact
            element={
              <ProtectedRoute>
                <PlansDetailsPage />
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
