import React, { useState } from "react";
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
  return (
    <div className="add-trip-card">
      <div className="return-icon" onClick={adding}>
        <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
      </div>
      <form className="addtrip" onSubmit={(e) => add(e)}>
        <h1>New Traveler</h1>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faPersonWalkingLuggage} />
            <input
              type="text"
              placeholder="Email of the new traveler"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </label>
        <input type="submit" value="Add New Traveler" />
      </form>
    </div>
  );
}

export default AddTravelerCard;
