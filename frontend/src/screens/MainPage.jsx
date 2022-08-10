import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";
import * as api from "../api";
import Bar from "../components/Bar";
import TripCard from "../components/trip/TripCard";
import AddTripCard from "../components/trip/AddTripCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function MainPage() {
  const [tripList, setTripList] = useState(null);
  const [message, setMessage] = useState(null);
  const [adding, setAdding] = useState(false);

  const navigate = useNavigate();

  const loadTripList = async () => {
    const { success, result: tripList, error } = await api.getTripList();
    if (success) {
      setTripList(tripList);
      setMessage(null);
    } else {
      setTripList([]);
      setMessage(error);
    }
  };

  const addTrip = async (newTripData) => {
    const { success, result: added, error } = await api.addTrip(newTripData);
    if (success) {
      const {
        success,
        result: addedWithTraveler,
        error,
      } = await api.addCreatorAsTraveler(added);
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
    loadTripList();
  }, []);

  return (
    <div className="main-page">
      <Bar mode="login" />
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
