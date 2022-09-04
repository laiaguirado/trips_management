import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TripDetailsPage.css";
import * as api from "../api";
import Bar from "../components/Bar";
import Loading from "../components/Loading";
import EditTripCard from "../components/trip/EditTripCard";
import TripDetailCard from "../components/trip/TripDetailCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faXmark, faPen } from "@fortawesome/free-solid-svg-icons";

function TripDetailsPage() {
  const [trip, setTrip] = useState(null);
  const [message, setMessage] = useState(null);
  const [editing, setEditing] = useState(false);
  const { tripId } = useParams();
  const navigate = useNavigate();

  document.body.style.overflow = "unset";

  const getTripData = async (tripId) => {
    const { success, result: trip, error } = await api.getTrip(tripId);
    if (success) {
      setTrip(trip);
      setMessage(null);
    } else {
      setTrip(null);
      setMessage(error);
    }
  };

  const deleteTraveler = async (tripId, email) => {
    const {
      success,
      result: deleted,
      error,
    } = await api.deleteTraveler(tripId, email);
    if (success) {
      setTrip(deleted);
    } else {
      setMessage(error);
    }
  };

  const onEdit = async (tripId, tripData) => {
    const {
      success,
      result: added,
      error,
    } = await api.updateTrip(tripId, tripData);

    if (success) {
      setTrip(added);
      setEditing(false);
      setMessage(null);
    } else {
      setMessage(error);
    }
  };

  function showComponentMode() {
    if (!editing) {
      return (
        <TripDetailCard
          trip={trip}
          tripId={tripId}
          onError={setMessage}
          message={message}
          onDeleteTraveler={deleteTraveler}
          onSetTrip={setTrip}
        />
      );
    } else {
      return <EditTripCard trip={trip} tripId={tripId} onEdit={onEdit} />;
    }
  }

  const returnEditing = () => {
    setEditing(false);
    setMessage(null);
  };

  useEffect(() => {
    getTripData(tripId);
  }, [tripId]);

  if (trip === null) {
    return (
      <div>
        <Bar mode="login" />
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <Bar mode="login" />
      <div className="trip-details-page">
        {!editing ? (
          <div
            className="return-icon page-return-icon"
            onClick={() => navigate(`/`, { replace: false })}
          >
            <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
          </div>
        ) : (
          <div
            className="return-icon page-return-icon"
            onClick={() => returnEditing()}
          >
            <FontAwesomeIcon icon={faXmark} size="3x" />{" "}
          </div>
        )}
        {!editing && (
          <div className="edit-icon" onClick={() => setEditing(true)}>
            <FontAwesomeIcon icon={faPen} size="2x" />{" "}
          </div>
        )}
        <div className="details-error error">{message}</div>
        {showComponentMode()}
      </div>
    </div>
  );
}

export default TripDetailsPage;
