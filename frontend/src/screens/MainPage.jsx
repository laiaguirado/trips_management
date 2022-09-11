import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";
import * as api from "../api";
import Bar from "../components/Bar";
import Loading from "../components/Loading";
import TripCard from "../components/trip/TripCard";
import AddTripCard from "../components/trip/AddTripCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { ModelContext } from "../model";

function MainPage() {
  const { catchUnauthorized } = useContext(ModelContext);
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
      setTripList(null);
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
        setMessage(null);
      } else {
        setMessage(error);
      }
    } else {
      window.scrollTo(0, 0);
      setMessage(error);
    }
  };

  function addTripForm() {
    if (adding) {
      return (
        <AddTripCard
          onAdd={addTrip}
          message={message}
          adding={() => {
            setAdding(false);
            setMessage(null);
          }}
        />
      );
    }
  }

  useEffect(() => {
    loadTripList();
    window.scrollTo(0, 0);
    document.body.style.overflow = "unset";
  }, []);

  if (tripList === null) {
    return (
      <div>
        <Bar mode="login" />
        <Loading />
      </div>
    );
  }

  return (
    <div className="main-page">
      <Bar mode="login" />
      <div className="error details-error">{message}</div>
      <div className="trips">
        <div className="new-trip">
          <div className="new-trip-button" onClick={() => setAdding(true)}>
            <FontAwesomeIcon icon={faCirclePlus} className="icon" />
          </div>
        </div>
        {Array.isArray(tripList) === true ? (
          tripList.map((trip) => (
            <TripCard
              className="trip"
              key={trip._id}
              trip={trip}
              onClick={() => navigate(`/trip/${trip._id}`, { replace: false })}
            />
          ))
        ) : (
          <p></p>
        )}
      </div>
      {addTripForm()}
    </div>
  );
}

export default MainPage;
