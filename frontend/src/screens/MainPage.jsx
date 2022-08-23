import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";
import * as api from "../api";
import Bar from "../components/Bar";
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
      setTripList([]);
      setMessage(error);
    }
  };

  const addTrip = async (newTripData) => {
    const { success, result: added, error } = catchUnauthorized(async () => await api.addTrip(newTripData)); //TODO catchUnauthorized en proves per controlar 401
    if (success) {
      const { success, result: addedWithTraveler, error } = await api.addCreatorAsTraveler(added);
      if (success) {
        setTripList((tripList) => [...tripList, addedWithTraveler]);
        setAdding(false);
        setMessage(null);
      } else {
        setMessage(error);
      }
    } else {
      setMessage(error);
    }
  };

  /*function addTripForm() {
    if (adding === false) {
      return (
        <div className="new-trip-button" onClick={() => setAdding(true)}>
          <FontAwesomeIcon icon={faCirclePlus} className="icon" />
        </div>
      );
    } else {
      return (
        <div>
          <AddTripCard
            onAdd={addTrip}
            adding={() => {
              setAdding(false);
              setMessage(null);
            }}
          />
          <div className="new-trip-button" onClick={() => setAdding(true)}>
            <FontAwesomeIcon icon={faCirclePlus} className="icon" />
          </div>
        </div>
      );
    }
  }*/

  function addTripForm() {
    if (adding) {
      return (
        <AddTripCard
          onAdd={addTrip}
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
  }, []);

  return (
    <div className="main-page">
      <Bar mode="login" />
      <div className="error">{message}</div>
      <div className="trips">
        <div className="new-trip">
          {addTripForm()}
          <div className="new-trip-button" onClick={() => setAdding(true)}>
            <FontAwesomeIcon icon={faCirclePlus} className="icon" />
          </div>
        </div>
        {Array.isArray(tripList) === true ? (
          tripList.map((trip) => <TripCard className="trip" key={trip._id} trip={trip} onClick={() => navigate(`/trip/${trip._id}`, { replace: false })} />)
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default MainPage;
