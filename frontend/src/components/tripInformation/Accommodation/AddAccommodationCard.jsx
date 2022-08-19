import React, { useState } from "react";
import "./AddAccommodationCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faLocationDot,
  faCalendar,
  faPhone,
  faEnvelope,
  faAngleLeft,
  faNoteSticky,
  faPersonWalkingLuggage,
  faSackDollar,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

function AddAccommodationCard({ onAdd, adding, tripId }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [checkInHour, setCheckInHour] = useState("");
  const [checkOutHour, setCheckOutHour] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [web, setWeb] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notation, setNotation] = useState("");

  const add = (e) => {
    e.preventDefault();
    onAdd(tripId, {
      name,
      notation,
      location,
      startDate,
      endDate,
      web,
      phone,
      email,
      resourceType: "Accommodation",
    });
  };

  return (
    <div className="add-accommodation-card">
      <div className="return-icon" onClick={adding}>
        <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
      </div>
      <form className="add-accommodation" onSubmit={(e) => add(e)}>
        <h1>New Accommodation</h1>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faPersonWalkingLuggage} />
            <input
              type="text"
              placeholder="Accommodation's name"
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
            <FontAwesomeIcon icon={faClock} />
            <input
              type="time"
              placeholder="Check in Hour"
              value={checkInHour}
              onChange={(event) => setCheckInHour(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faClock} />
            <input
              type="time"
              placeholder="Check out Hour"
              value={checkOutHour}
              onChange={(event) => setCheckOutHour(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faSackDollar} />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <select
            required
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
          >
            <option value="Select...">Select a currency</option>
            <option value="€">Euro €</option>
            <option value="$">Dollar $</option>
            <option value="£">Libra £</option>
          </select>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faGlobe} />
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
            <FontAwesomeIcon icon={faPhone} />
            <input
              type="tel"
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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faNoteSticky} />
            <input
              type="text"
              placeholder="Notation"
              value={notation}
              onChange={(event) => setNotation(event.target.value)}
            />
          </div>
        </label>
        <input type="submit" value="Create New Accommodation" />
      </form>
    </div>
  );
}

export default AddAccommodationCard;
