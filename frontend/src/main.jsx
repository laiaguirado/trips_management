import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ModelProvider } from "./model";
import "./index.css";
import App from "./App";
import TripDetailsPage from "./screens/TripDetailsPage";
import AccommodationPage from "./screens/tripInformation/AccommodationPage";
import TransportationPage from "./screens/tripInformation/TransportationPage";
import ThingsToDoPage from "./screens/tripInformation/ThingsToDoPage";
import PlacesToEatPage from "./screens/tripInformation/PlacesToEatPage";
import MainPage from "./screens/MainPage";
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
            path="/trip/:tripId/thingsToDo"
            exact
            element={
              <ProtectedRoute>
                <ThingsToDoPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/trip/:tripId/placesToEat"
            exact
            element={
              <ProtectedRoute>
                <PlacesToEatPage />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </ModelProvider>
  </React.StrictMode>
);
