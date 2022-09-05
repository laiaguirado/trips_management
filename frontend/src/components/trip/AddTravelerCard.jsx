import React, { useState } from "react";
import "./AddTravelerCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonWalkingLuggage,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

function AddTravelerCard({ onAdd, tripMessage, adding, trip, tripId }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(tripMessage);
  const add = (e) => {
    e.preventDefault();
    let addTraveler = true;
    for (let j = 0; j < trip.travellers.length; j++) {
      if (trip.travellers[j].user.email === email) {
        setMessage(`Traveler already added to the trip`);
        addTraveler = false;
      }
    }
    if (addTraveler === true) {
      onAdd(tripId, email);
    }
  };

  document.body.style.overflow = "hidden";
  return (
    <div className="add-card add-traveler-card">
      <div className="background" onClick={adding}></div>
      <div className="form-container">
        <div className="return-icon" onClick={adding}>
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <form className="add-form" onSubmit={(e) => add(e)}>
          <h1 className="title">New Traveler</h1>
          <div className="details-error error">{message}</div>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faPersonWalkingLuggage} className="icon" />
              <input
                className="input"
                required
                type="email"
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
