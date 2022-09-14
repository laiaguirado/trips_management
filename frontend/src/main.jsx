import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ModelProvider } from "./model";
import "./index.css";
import App from "./App";
import TripDetailsPage from "./screens/TripDetailsPage";
import AccommodationPage from "./screens/tripInformation/Accommodation/AccommodationPage";
import TransportPage from "./screens/tripInformation/Transport/TransportPage";
import PlansPage from "./screens/tripInformation/Plans/PlansPage";
import RestaurantPage from "./screens/tripInformation/Restaurant/RestaurantPage";
import ProtectedRoute from "./screens/ProtectedRoute";
import AccommodationDetailsPage from "./screens/tripInformation/Accommodation/AccommodationDetailsPage";
import TransportDetailsPage from "./screens/tripInformation/Transport/TransportDetailsPage";
import PlansDetailsPage from "./screens/tripInformation/Plans/PlansDetailsPage";
import RestaurantDetailsPage from "./screens/tripInformation/Restaurant/RestaurantDetailsPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModelProvider>
      <link
        rel="stylesheet"
        type="text/css"
        href="//fonts.googleapis.com/css?family=Allerta"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="//fonts.googleapis.com/css?family=Open+Sans"
      ></link>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"
        rel="stylesheet"
        type="text/css"
      />
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
            path="/trip/:tripId/transport"
            exact
            element={
              <ProtectedRoute>
                <TransportPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/trip/:tripId/transport/:transportId"
            exact
            element={
              <ProtectedRoute>
                <TransportDetailsPage />
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
            path="/trip/:tripId/restaurant"
            exact
            element={
              <ProtectedRoute>
                <RestaurantPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/trip/:tripId/restaurant/:restaurantId"
            exact
            element={
              <ProtectedRoute>
                <RestaurantDetailsPage />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </ModelProvider>
  </React.StrictMode>
);
