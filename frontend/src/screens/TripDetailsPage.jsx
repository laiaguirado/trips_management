import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TripDetailsPage.css";
import * as api from "../api";
import Bar from "../components/Bar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faBed,
  faPlane,
  faCamera,
  faUtensils,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

function TripDetailsPage() {
  const [trip, setTrip] = useState([]);
  const [message, setMessage] = useState(null);
  const { tripId } = useParams();
  const navigate = useNavigate();

  const getTripData = async () => {
    const { success, trip, error } = await api.getTrip(tripId);
    if (success) {
      setTrip(trip);
    } else {
      setMessage(error);
    }
  };

  const deleteTrip = async (tripId) => {
    const { success, error } = await api.deleteTrip(tripId);
    if (success) {
      navigate(`/`, { replace: false });
    } else {
      setMessage(error);
    }
  };

  useEffect(() => {
    getTripData();
  }, [tripId]);

  return (
    <div className="trip-details-page">
      <Bar mode="login" />
      <div>
        <div
          className="return-icon"
          onClick={() => navigate(`/`, { replace: false })}
        >
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <div>{message}</div>
        <h3>TripDetailsPage</h3>
        <h1> {trip.name}</h1>
        <h3>
          Dates: {trip.startDate} - {trip.endDate}
        </h3>
        <h3>Members:</h3>
        <div>
          {Array.isArray(trip) !== true ? (
            trip.travellers.map((member) => (
              <p key={member._id}>{member.username}</p>
            ))
          ) : (
            <p></p>
          )}
        </div>
        <div
          className="details-info"
          onClick={() =>
            navigate(`/trip/${tripId}/accomodation`, { replace: false })
          }
        >
          <FontAwesomeIcon className="icon" icon={faBed} size="2x" />{" "}
          Accomodation
        </div>
        <div
          className="details-info"
          onClick={() =>
            navigate(`/trip/${tripId}/transportation`, { replace: false })
          }
        >
          <FontAwesomeIcon className="icon" icon={faPlane} size="2x" />
          Transportation
        </div>
        <div
          className="details-info"
          onClick={() =>
            navigate(`/trip/${tripId}/thingsToDo`, { replace: false })
          }
        >
          <FontAwesomeIcon className="icon" icon={faCamera} size="2x" />
          Things To Do
        </div>
        <div
          className="details-info"
          onClick={() =>
            navigate(`/trip/${tripId}/placesToEat`, { replace: false })
          }
        >
          <FontAwesomeIcon className="icon" icon={faUtensils} size="2x" />
          Places To Eat
        </div>
        <div
          className="delete-trip"
          onClick={() => {
            deleteTrip(tripId);
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} /> DELETE TRIP
        </div>
      </div>
    </div>
  );
}

export default TripDetailsPage;
