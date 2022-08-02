import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartFlatbedSuitcase,
  faLocationDot,
  faCalendar,
  faPhone,
  faEnvelope,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

function AddAccomodationCard({ onAdd, adding, tripId }) {
  const [web, setWeb] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const add = (e) => {
    e.preventDefault();
    onAdd(tripId, {
      web,
      location,
      startDate,
      endDate,
      phone,
      email,
      resourceType: "accommodation",
    });
  };

  return (
    <div className="add-accomodation-card">
      <div className="return-icon" onClick={adding}>
        <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
      </div>
      <form className="addaccomodation" onSubmit={(e) => add(e)}>
        <h1>New Accomodation</h1>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faCartFlatbedSuitcase} />
            <input
              type="text"
              placeholder="Web"
              value={web}
              onChange={(event) => setWeb(event.target.value)}
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
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faPhone} />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </label>
        <input type="submit" value="Create New Accomodation" />
      </form>
    </div>
  );
}

export default AddAccomodationCard;
