import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddTravelerCard from "./AddTravelerCard";
import DeleteCard from "../DeleteCard";
import * as helper from "../../helper";
import * as api from "../../api";
import "./TripDetailCard.css";
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
  faPen,
} from "@fortawesome/free-solid-svg-icons";

function TripDetailCard({
  trip,
  tripId,
  onError: setMessage,
  onSetTrip: setTrip,
  onDeleteTraveler: deleteTraveler,
}) {
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  /* useEffect(() => {
    window.scrollTo(0, 0);
  }, []); */

  document.body.style.overflow = "unset";

  function getDateValue(value, placeholder) {
    if (value === "" || value === undefined) {
      return placeholder;
    }
    const date = new Date(value);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = ("0" + date.getFullYear()).slice(-4);
    return day + "/" + month + "/" + year;
  }
  const addTraveler = async (tripId, email) => {
    const {
      success,
      result: added,
      error,
    } = await api.addTraveler(tripId, email);
    if (success) {
      setTrip(added);
      setAdding(false);
      setMessage(null);
    } else {
      if (error.startsWith("Bad request")) {
        setMessage(
          `Couldn't add traveler ${error.substring(11, error.length)}`
        );
      } else {
        setMessage(error);
      }
    }
  };

  function addTravelerForm() {
    if (adding) {
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

  const deleteTrip = async (tripId) => {
    const { success, error } = await api.deleteTrip(tripId);
    if (success) {
      navigate(`/`, { replace: false });
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
        <DeleteCard
          onDelete={() => deleteTrip(tripId)}
          deleting={() => setDeleting(false)}
          deleteType={"Trip"}
        />
      );
    }
  }

  return (
    <>
      <div className="trip">
        <div className="trip-info">
          <h1 className="trip-name details-title"> {trip.name}</h1>
          <div className="trip-location trip-detail">
            <h3>Location: </h3>
            <div>{trip.location}</div>
          </div>
          <div className="trip-dates trip-detail">
            <h3>Dates:</h3>
            {Array.isArray(trip) !== true ? (
              <div>
                {helper.changeDateOrder(
                  trip.startDate.substring(0, trip.startDate.length - 14)
                ) +
                  " / " +
                  helper.changeDateOrder(
                    trip.endDate.substring(0, trip.startDate.length - 14)
                  )}
              </div>
            ) : (
              <div></div>
            )}
          </div>
          {trip.description && (
            <div className="trip-description trip-detail">
              <h3>Description:</h3>
              <div className="notation-text">{trip.description}</div>
            </div>
          )}
          <div className="trip-members trip-detail">
            <h3>Travelers:</h3>
            <div className="travelers-list">
              {Array.isArray(trip) !== true ? (
                trip.travellers.map((member) => (
                  <div className="member trip-detail" key={member._id}>
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
          <div className="add-traveler">
            {addTravelerForm()}
            <div
              className="add-traveler-button"
              onClick={() => setAdding(true)}
            >
              <FontAwesomeIcon icon={faPlus} /> Add Traveler
            </div>
          </div>
        </div>
        <img
          className="trip-image"
          src={"http://localhost:8080/upload" + trip.image.name}
        ></img>
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
          onClick={() => navigate(`/trip/${tripId}/plans`, { replace: false })}
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
    </>
  );
}

export default TripDetailCard;
