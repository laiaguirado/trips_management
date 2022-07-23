import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css'
import App from './App'
import TripDetailsPage from "./screens/TripDetailsPage"
import AccomodationPage from "./screens/AccomodationPage"
import TransportationPage from './screens/TransportationPage';
import ThingsToDoPage from './screens/ThingsToDoPage';
import PlacesToEatPage from './screens/PlacesToEatPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<App />} ></Route>
        <Route path="/trip/:tripId" exact element={<TripDetailsPage />} ></Route>
        <Route path="/trip/:tripId/accomodation" exact element={<AccomodationPage />} ></Route>
        <Route path="/trip/:tripId/transportation" exact element={<TransportationPage />} ></Route>
        <Route path="/trip/:tripId/thingsToDo" exact element={<ThingsToDoPage />} ></Route>
        <Route path="/trip/:tripId/placesToEat" exact element={<PlacesToEatPage />} ></Route>
      </Routes>
    </BrowserRouter >
  </React.StrictMode>
)