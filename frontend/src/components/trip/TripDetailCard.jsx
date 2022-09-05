import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddTravelerCard from "./AddTravelerCard";
import DeleteCard from "../DeleteCard";
import * as helper from "../../helper";
import * as api from "../../api";
import "./TripDetailCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faPlane,
  faCamera,
  faUtensils,
  faTrashCan,
  faPlus,
  faXmark,
  faUserCheck,
  faUserLarge,
} from "@fortawesome/free-solid-svg-icons";

function TripDetailCard({
  trip,
  tripId,
  onError: setMessage,
  message,
  onSetTrip: setTrip,
  onDeleteTraveler: deleteTraveler,
}) {
  const [userData, setUserData] = useState("");
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  document.body.style.overflow = "unset";

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
          tripMessage={message}
          adding={() => {
            setAdding(false);
            setMessage(null);
          }}
          trip={trip}
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

  const getUserData = async () => {
    const { success, result: userData, error } = await api.getUserData();
    if (success) {
      setUserData(userData);
    } else {
      setMessage(error);
    }
  };

  function deleteButton() {
    if (deleting) {
      return (
        <DeleteCard
          onDelete={() => deleteTrip(tripId)}
          deleting={() => setDeleting(false)}
          deleteType={"Trip"}
        />
      );
    }
  }

  function obtainAdminUser() {
    let userAdmin;
    let userTraveler;
    trip.travellers.map((member) =>
      member.type === "admin"
        ? (userAdmin = member.user)
        : (userTraveler = member.user)
    );
    return userAdmin;
  }

  useEffect(() => {
    getUserData();
  }, []);

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
                    <p className="username">
                      {member.user.username + " (" + member.user.email + ")"}
                    </p>
                    {member.type === "admin" ? (
                      <div className="member-info">
                        <FontAwesomeIcon
                          className="traveler-icon"
                          icon={faUserCheck}
                        />
                        <p className="member-type">{member.type}</p>
                      </div>
                    ) : (
                      <div className="member-info">
                        <FontAwesomeIcon
                          className="traveler-icon"
                          icon={faUserLarge}
                        />
                        <p className="member-type">{member.type}</p>
                        <div
                          className="delete-member"
                          onClick={() =>
                            deleteTraveler(tripId, member.user.email)
                          }
                        >
                          {" "}
                          <FontAwesomeIcon
                            className="delete-icon"
                            icon={faXmark}
                          />{" "}
                        </div>
                      </div>
                    )}
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
        {trip.image.name ? (
          <img
            className="trip-image"
            src={"http://localhost:8080/upload" + trip.image.name}
          ></img>
        ) : (
          <img className="trip-image" src={trip.image.url}></img>
        )}
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
      {userData._id === obtainAdminUser()._id ? (
        <div>
          <div
            className="delete-trip"
            onClick={() => {
              setDeleting(true);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} /> DELETE TRIP
          </div>
          {deleteButton()}
        </div>
      ) : (
        <div></div>
      )}
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
