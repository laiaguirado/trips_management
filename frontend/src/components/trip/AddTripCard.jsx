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
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";

function AddTripCard({ onAdd, adding }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const add = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("fileImage", imageFile);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    onAdd(formData);
  };
  //todo error message
  //todo mark required fields
  return (
    <div className="add-trip-card form-container ">
      <div className="return-icon" onClick={adding}>
        <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
      </div>
      <form className="add-trip" onSubmit={(e) => add(e)}>
        <h1 className="title">New Trip</h1>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faCartFlatbedSuitcase} className="icon" />
            <input
              className="input"
              type="text"
              placeholder="Trip Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faLocationDot} className="icon" />
            <input
              className="input"
              type="text"
              placeholder="Location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faCalendar} className="icon" />
            <input
              placeholder="Start Date"
              className="input date"
              type="text"
              value={startDate}
              onFocus={(event) => (event.target.type = "date")}
              onBlur={(event) => (event.target.type = "text")}
              onChange={(event) => setStartDate(event.target.value)}
              id="date"
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faCalendar} className="icon" />
            <input
              placeholder="End Date"
              className="input date"
              type="text"
              value={endDate}
              min={startDate}
              onFocus={(event) => (event.target.type = "date")}
              onBlur={(event) => (event.target.type = "text")}
              onChange={(event) => setEndDate(event.target.value)}
              id="date"
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faImage} className="icon" />
            <input
              className="input upload"
              type="file"
              onInput={(event) => {
                setImageFile(event.target.files[0]);
              }}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faNoteSticky} className="icon" />
            <textarea
              className="input description"
              rows="5"
              cols="30"
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>
        </label>
        <input
          className="submit-button form-data"
          type="submit"
          value="Create New Trip"
        />
      </form>
    </div>
  );
}

export default AddTripCard;
