import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModelContext } from "../model";
import { useContext } from "react";
import "./MainPage.css";
import * as api from "../api";
import Bar from "../components/Bar";
import TripCard from "../components/TripCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddTripCard from "../components/AddTripCard";

function MainPage() {
  const [userData, setUserData] = useState(null);
  const [tripList, setTripList] = useState(null);
  const [message, setMessage] = useState(null);
  const [adding, setAdding] = useState(false);
  const { logout } = useContext(ModelContext);

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
      const { success, addedWithTraveler, error } =
        await api.addCreatorAsMember(added);
      if (success) {
        setTripList((tripList) => [...tripList, addedWithTraveler]);
        setAdding(false);
      } else {
        setMessage(error);
      }
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
      return <AddTripCard onAdd={addTrip} adding={() => setAdding(false)} />;
    }
  }

  useEffect(() => {
    getUserData();
    loadTripList();
  }, []);

  return (
    <div className="main-page">
      <Bar mode="login" userData={userData} />
      <div>{message}</div>
      <div>
        <h3>Main Page</h3>
        <div>{addTripForm()}</div>
        <div className="trip-list">
          {Array.isArray(tripList) === true ? (
            tripList.map((trip) => (
              <TripCard
                key={trip._id}
                trip={trip}
                onClick={() =>
                  navigate(`/trip/${trip._id}`, { replace: false })
                }
              />
            ))
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
