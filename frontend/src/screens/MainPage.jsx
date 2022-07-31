import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";
import * as api from "../api";
import Bar from "../components/Bar";
import TripCard from "../components/TripCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddTrip from "../components/AddTrip";

function MainPage({ onLogout }) {
  const [userData, setUserData] = useState(null);
  const [tripList, setTripList] = useState([]);
  const [message, setMessage] = useState(null);
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();

  const getUserData = async () => {
    const { success, userData, error } = await api.getUserData();
    if (success) {
      setUserData(userData);
    } else {
      setMessage(error);
    }
  };

  const loadTripList = async () => {
    const { success, tripList, error } = await api.getTripList();
    if (success) {
      setTripList(tripList);
      setMessage(null);
    } else {
      setTripList([]);
      setMessage(error);
    }
  };

  const addTrip = async (newTripData) => {
    const { success, added, error } = await api.addTrip(newTripData);
    if (success) {
      setTripList((tripList) => [...tripList, added]);
      setAdding(false);
    } else {
      setMessage(error);
    }
  };

  function addTripForm() {
    if (adding === false) {
      return (
        <div className="add-trip-button" onClick={() => setAdding(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      );
    } else {
      return <AddTrip onAdd={addTrip} />;
    }
  }

  useEffect(() => {
    getUserData();
    loadTripList();
  }, []);

  return (
    <div className="main-page">
      <Bar mode="login" userData={userData} onLogout={onLogout} />
      <div>{message}</div>
      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
      <div>
        <h3>Main Page</h3>
        <div>{addTripForm()}</div>
        <div className="trip-list">
          {tripList.map((trip) => (
            <TripCard
              key={trip._id}
              trip={trip}
              onClick={() => navigate(`/trip/${trip._id}`, { replace: false })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
