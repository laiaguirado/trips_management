import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AddTripCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCartFlatbedSuitcase,
  faImage,
  faCalendar,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

function AddTripCard({ onAdd, adding }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const add = (e) => {
    e.preventDefault();
    onAdd({ name, location, startDate, endDate });
  };

  return (
    <div className="add-trip-card">
      <div className="return-icon" onClick={adding}>
        <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
      </div>
      <form className="addtrip" onSubmit={(e) => add(e)}>
        <h1>New Trip</h1>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faCartFlatbedSuitcase} />
            <input
              type="text"
              placeholder="Trip Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faLocationDot} />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faImage} />
            <input
              type="text"
              placeholder="Image"
              value={image}
              onChange={(event) => setImage(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faCalendar} />
            <input
              type="date"
              placeholder="Start date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faCalendar} />
            <input
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>
        </label>
        <input type="submit" value="Create New Trip" />
      </form>
    </div>
  );
}

export default AddTripCard;
