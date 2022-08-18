import React, { useState } from "react";
import "./AddTravelerCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonWalkingLuggage,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

function AddTravelerCard({ onAdd, adding, tripId }) {
  const [email, setEmail] = useState("");
  const add = (e) => {
    e.preventDefault();
    onAdd(tripId, email);
  };

  document.body.style.overflow = "hidden";
  //todo click backdrop
  //todo error message
  return (
    <div className="add-trip-card add-traveler-card">
      <div className="form-container">
        <div className="return-icon" onClick={adding}>
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <form className="add-trip" onSubmit={(e) => add(e)}>
          <h1 className="title">New Traveler</h1>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faPersonWalkingLuggage} className="icon" />
              <input
                className="input"
                type="text"
                placeholder="Email of the new traveler"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </label>
          <input
            className="submit-button form-data"
            type="submit"
            value="Create New Traveler"
          />
        </form>
      </div>
    </div>
  );
}

export default AddTravelerCard;
