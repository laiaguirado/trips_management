import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TripDetailsPage.css";
import * as api from "../api";
import * as helper from "../helper";
import Bar from "../components/Bar";
import Loading from "../components/Loading";
import DeleteCard from "../components/DeleteCard";
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
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { isTokenExpired } from "../token";

function TripDetailsPage() {
  const [trip, setTrip] = useState(null);
  const [tripName, setTripName] = useState(null);
  const [tripLocation, setTripLocation] = useState(null);
  const [tripStartDate, setTripStartDate] = useState(null);
  const [tripEndDate, setTripEndDate] = useState(null);
  const [tripDescription, setTripDescription] = useState(null);
  const [tripImage, setTripImage] = useState(null);
  const [message, setMessage] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(false);
  const { tripId } = useParams();
  const navigate = useNavigate();

  document.body.style.overflow = "unset";

  const getTripData = async (tripId) => {
    const { success, result: trip, error } = await api.getTrip(tripId);
    if (success) {
      setTrip(trip);
      setTripName(trip.name);
      setTripDescription(trip.description);
      setTripLocation(trip.location);
      setTripStartDate(trip.startDate);
      setTripEndDate(trip.endDate);
      setTripImage(trip.setTripImage);
      setMessage(null);
    } else {
      setTrip(null);
      //setTripName(null);
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
    const {
      success,
      result: added,
      error,
    } = await api.addTraveler(tripId, email);
    if (success) {
      setTrip(added);
      //setTripName(trip.name);
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
        <DeleteCard
          onDelete={() => deleteTrip(tripId)}
          deleting={() => setDeleting(false)}
          deleteType={"Trip"}
        />
      );
    }
  }

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

  const onEdit = async (tripId, tripData) => {
    const {
      success,
      result: added,
      error,
    } = await api.updateTrip(tripId, tripData);
    if (success) {
      setTransportation(tripData);
      setEditing(false);
      setMessage(null);
    } else {
      setMessage(error);
    }
  };

  function getTripInfo() {
    return (
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
          <div className="add-traveler-button" onClick={() => setAdding(true)}>
            <FontAwesomeIcon icon={faPlus} /> Add Traveler
          </div>
        </div>
      </div>
    );
  }

  function editTripInfo() {
    return (
      <div className="edit-card">
        <div className="trip-info">
          <form className="add-form" onSubmit={(e) => update(e)}>
            <div className="trip-name details-title">
              <label>
                <input
                  className="input edit-trip-name"
                  required
                  type="text"
                  placeholder="Trip Name *"
                  value={trip.name}
                  onChange={(event) => {
                    trip.name = event.target.value;
                    setTrip(trip);
                    setTripName(trip.name);
                  }}
                />
              </label>
            </div>
            <div className="trip-location trip-detail">
              <h3>Location: </h3>
              <label>
                <div className="form-data">
                  <input
                    className="input"
                    required
                    type="text"
                    placeholder="Location *"
                    value={trip.location}
                    onChange={(event) => {
                      trip.location = event.target.value;
                      setTrip(trip);
                      setTripLocation(trip.location);
                    }}
                  />
                </div>
              </label>
            </div>
            <div className="trip-dates trip-detail">
              <h3>Dates:</h3>
              <div>
                <label>
                  <div className="form-data">
                    <input
                      id="date"
                      className="input date"
                      required
                      type="text"
                      placeholder="Start Date *"
                      max={trip.endDate}
                      onFocus={(event) => {
                        event.target.type = "date";
                        event.target.value = trip.startDate;
                      }}
                      onBlur={(event) => {
                        event.target.type = "text";
                        event.target.value = getDateValue(
                          trip.startDate,
                          "Start Date *"
                        );
                      }}
                      onChange={(event) => {
                        trip.startDate = event.target.value;
                        setTrip(trip);
                        setTripStartDate(trip.startDate);
                      }}
                    />
                  </div>
                </label>
                <label>
                  <div className="form-data">
                    <input
                      id="date"
                      className="input date"
                      required
                      type="text"
                      placeholder="End Date *"
                      min={trip.startDate}
                      onFocus={(event) => {
                        event.target.type = "date";
                        event.target.value = trip.endDate;
                      }}
                      onBlur={(event) => {
                        event.target.type = "text";
                        event.target.value = getDateValue(
                          trip.endDate,
                          "End Date *"
                        );
                      }}
                      onChange={(event) => {
                        trip.endDate = event.target.value;
                        setTrip(trip);
                        setTripEndDate(trip.endDate);
                      }}
                    />
                  </div>
                </label>
              </div>
            </div>
            <div className="trip-description trip-detail">
              <h3>Description:</h3>
              <div className="notation-text">
                <label>
                  <div className="form-data">
                    <textarea
                      className="input description"
                      rows="5"
                      cols="30"
                      placeholder="Description"
                      value={trip.description}
                      onChange={(event) => {
                        trip.description = event.target.value;
                        setTrip(trip);
                        setTripDescription(trip.description);
                      }}
                    ></textarea>
                  </div>
                </label>
              </div>
            </div>
            <input
              className="submit-button form-data"
              type="submit"
              value="Edit Trip"
            />
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
                        <FontAwesomeIcon
                          className="delete-icon"
                          icon={faXmark}
                        />
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
          </form>
        </div>
      </div>
    );
  }

  function getTripImage() {
    if (!editing) {
      return (
        <img
          className="trip-image"
          src={"http://localhost:8080/upload" + trip.image.name}
        ></img>
      );
    }
    return (
      <div className="uploading-new-image">
        <img
          className="trip-image image-editing"
          src={"http://localhost:8080/upload" + trip.image.name}
        ></img>
        <label>
          <div className="form-data">
            <input
              className="input upload"
              required
              type="file"
              onInput={(event) => {
                console.log(trip.image);
                trip.image = event.target.files[0];
                setTrip(trip);
                setTripImage(trip.image);
                console.log(trip.image);
              }}
            />
          </div>
        </label>
      </div>
    );
  }
  const update = (e) => {
    e.preventDefault();
    setEditing(false);
    onEdit(restorationId, {
      tripName,
      tripDescription,
      tripLocation,
      tripStartDate,
      tripEndDate,
      tripImage,
    });
  };

  return (
    <div>
      <Bar mode="login" />
      <div className="trip-details-page">
        <div
          className="return-icon page-return-icon"
          onClick={() => navigate(`/`, { replace: false })}
        >
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <div className="edit-icon" onClick={() => setEditing(true)}>
          <FontAwesomeIcon icon={faPen} size="2x" />{" "}
        </div>
        <div className="error">{message}</div>
        <div className="trip">
          {!editing ? getTripInfo() : editTripInfo()}
          {getTripImage()}
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
