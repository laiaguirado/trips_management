import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TripDetailsPage.css";
import * as api from "../api";
import Bar from "../components/Bar";
import DeleteTripCard from "../components/trip/DeleteTripCard";
import AddTravelerCard from "../components/trip/AddTravelerCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faBed,
  faPlane,
  faCamera,
  faUtensils,
  faTrashCan,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function TripDetailsPage() {
  const [trip, setTrip] = useState([]);
  const [message, setMessage] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [adding, setAdding] = useState(false);
  const { tripId } = useParams();
  const navigate = useNavigate();

  const getTripData = async (tripId) => {
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

  const addTraveler = async (tripId, email) => {
    const { success, added, error } = await api.addTraveler(tripId, email);
    if (success) {
      getTripData(tripId);
      setAdding(false);
      setMessage(null);
    } else {
      setMessage(error);
    }
  };

  const deleteTraveler = async (tripId, email) => {
    const { success, error } = await api.deleteTraveler(tripId, email);
    if (success) {
      getTripData(tripId);
    } else {
      setMessage(error);
    }
  };

  function deleteButton() {
    if (deleting === false) {
      return (
        <div
          className="delete-trip"
          onClick={() => {
            setDeleting(true);
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} /> DELETE TRIP
        </div>
      );
    } else {
      return (
        <DeleteTripCard
          onDelete={() => deleteTrip(tripId)}
          deleting={() => setDeleting(false)}
          deleteType={"Trip"}
        />
      );
    }
  }

  function addTravelerForm() {
    if (adding === false) {
      return (
        <div className="add-traveler-button" onClick={() => setAdding(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      );
    } else {
      return (
        <AddTravelerCard
          onAdd={addTraveler}
          adding={() => {
            setAdding(false);
            setMessage(null);
          }}
          tripId={tripId}
        />
      );
    }
  }

  useEffect(() => {
    getTripData(tripId);
  }, [tripId]);

  return (
    <div>
      <Bar mode="login" />
      <div className="trip-details-page">
        <div
          className="return-icon"
          onClick={() => navigate(`/`, { replace: false })}
        >
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <div>{message}</div>
        <div className="trip-info">
          <h1 className="trip-name"> {trip.name}</h1>
          <div className="trip-location">
            <h3>Location: </h3>
            <div>{trip.location}</div>
          </div>
          <div className="trip-description">
            <h3>Description:</h3>
            <div>{trip.description}</div>
          </div>
          <div className="trip-dates">
            <h3>Dates:</h3>
            {Array.isArray(trip) !== true ? (
              <div>
                {trip.startDate.substring(0, trip.startDate.length - 14) +
                  " / " +
                  trip.endDate.substring(0, trip.startDate.length - 14)}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="trip-members">
            <h3>Travelers:</h3>
            <div className="travelers-list">
              {Array.isArray(trip) !== true ? (
                trip.travellers.map((member) => (
                  <div className="member" key={member._id}>
                    <p>
                      {member.username} ( {member.email} )
                    </p>
                    <div onClick={() => deleteTraveler(tripId, member.email)}>
                      <FontAwesomeIcon className="delete-icon" icon={faXmark} />
                    </div>
                  </div>
                ))
              ) : (
                <p></p>
              )}
            </div>
          </div>
          <div>{addTravelerForm()}</div>
        </div>
        <div className="trip-details-info">
          <div
            className="details-info"
            onClick={() =>
              navigate(`/trip/${tripId}/accommodation`, { replace: false })
            }
          >
            <FontAwesomeIcon className="icon" icon={faBed} size="2x" />{" "}
            Accommodation
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
              navigate(`/trip/${tripId}/plans`, { replace: false })
            }
          >
            <FontAwesomeIcon className="icon" icon={faCamera} size="2x" />
            Plans
          </div>
          <div
            className="details-info"
            onClick={() =>
              navigate(`/trip/${tripId}/restoration`, { replace: false })
            }
          >
            <FontAwesomeIcon className="icon" icon={faUtensils} size="2x" />
            Restoration
          </div>
        </div>
        <div>{deleteButton()}</div>
        <div className="trip-comments">
          <h3>Comments:</h3>
          {/*<div>
            {Array.isArray(trip) !== true ? (
              trip.comments.map((comment) => (
                <p key={comment._id}>{comment.username} : {comment.text}</p>
              ))
            ) : (
              <p></p>
            )}
            </div>*/}
        </div>
      </div>
    </div>
  );
}

export default TripDetailsPage;
