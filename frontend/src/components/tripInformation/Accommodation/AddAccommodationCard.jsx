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
  faDollarSign,
  faDog,
  faWifi,
  faPersonSwimming,
  faHotel,
} from "@fortawesome/free-solid-svg-icons";

function AddAccommodationCard({ onAdd, adding, tripId }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [checkInHour, setCheckInHour] = useState("");
  const [checkOutHour, setCheckOutHour] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [petFriendly, setPetFriendly] = useState(null);
  const [internet, setInternet] = useState(null);
  const [swimmingPool, setSwimmingPool] = useState(null);
  const [web, setWeb] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notation, setNotation] = useState("");

  const add = (e) => {
    e.preventDefault();
    onAdd(tripId, {
      name,
      type,
      location,
      startDate,
      endDate,
      checkInHour,
      checkOutHour,
      price,
      currency,
      petFriendly,
      internet,
      swimmingPool,
      web,
      phone,
      email,
      notation,
    });
  };
  //todo dates fields style
  //todo times fields style
  return (
    <div className="add-card add-accommodation-card">
      <div className="form-container">
        <div className="return-icon" onClick={adding}>
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <form className="add-form" onSubmit={(e) => add(e)}>
          <h1 className="title">New Accommodation</h1>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faPersonWalkingLuggage} className="icon" />
              <input
                className="input"
                required
                type="text"
                placeholder="Accommodation's name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faHotel} className="icon" />
              <select
                className="input date"
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option value="" disabled={true}>
                  Select an accommodation
                </option>
                <option value="Hotel">Hotel</option>
                <option value="Apartment">Apartment</option>
                <option value="Camping">Camping</option>
                <option value="Bungalow">Bungalow</option>
                <option value="Hostal">Hostal</option>
                <option value="Chalets">Chalets</option>
                <option value="Cottages">Cottages</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faLocationDot} className="icon" />
              <input
                className="input"
                required
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
                id="date"
                className="input date"
                placeholder="Start Date"
                value={startDate}
                max={endDate}
                onFocus={(event) => (event.target.type = "date")}
                onBlur={(event) => (event.target.type = "text")}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faCalendar} className="icon" />
              <input
                id="date"
                className="input date"
                placeholder="End Date"
                value={endDate}
                min={startDate}
                onFocus={(event) => (event.target.type = "date")}
                onBlur={(event) => (event.target.type = "text")}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faClock} className="icon" />
              <input
                className="input date"
                placeholder="Check in Hour"
                value={checkInHour}
                onFocus={(event) => (event.target.type = "time")}
                onBlur={(event) => (event.target.type = "text")}
                onChange={(event) => setCheckInHour(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faClock} className="icon" />
              <input
                className="input date"
                placeholder="Check out Hour"
                value={checkOutHour}
                onFocus={(event) => (event.target.type = "time")}
                onBlur={(event) => (event.target.type = "text")}
                onChange={(event) => setCheckOutHour(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faSackDollar} className="icon" />
              <input
                className="input"
                type="number"
                placeholder="Price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faDollarSign} className="icon" />
              <select
                className="input date"
                required={price ? "required" : ""}
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
              >
                <option value="" disabled={true}>
                  Select a currency
                </option>
                <option value="€">Euro €</option>
                <option value="$">Dollar $</option>
                <option value="£">Libra £</option>
              </select>
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faDog} className="icon" />
              <p>Is it pet friendly?</p>
              <div>
                <input
                  name="petFriendly"
                  type="radio"
                  value={petFriendly}
                  onChange={() => setPetFriendly(true)}
                />
                <label>Yes</label>
                <input
                  name="petFriendly"
                  type="radio"
                  value={petFriendly}
                  onChange={() => setPetFriendly(false)}
                />
                <label>No</label>
              </div>
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faWifi} className="icon" />
              <p>Is there Wi-Fi?</p>
              <div>
                <input
                  name="internet"
                  type="radio"
                  value={internet}
                  onChange={() => setInternet(true)}
                />
                <label>Yes</label>
                <input
                  name="internet"
                  type="radio"
                  value={internet}
                  onChange={() => setInternet(false)}
                />
                <label>No</label>
              </div>
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faPersonSwimming} className="icon" />
              <p>Is there swimming pool?</p>
              <div>
                <input
                  name="swimmingPool"
                  type="radio"
                  value={swimmingPool}
                  onChange={() => setSwimmingPool(true)}
                />
                <label>Yes</label>
                <input
                  name="swimmingPool"
                  type="radio"
                  value={swimmingPool}
                  onChange={() => setSwimmingPool(false)}
                />
                <label>No</label>
              </div>
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faGlobe} className="icon" />
              <input
                className="input"
                type="text"
                placeholder="Web"
                value={web}
                onChange={(event) => setWeb(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faPhone} className="icon" />
              <input
                className="input"
                type="tel"
                placeholder="Phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faEnvelope} className="icon" />
              <input
                className="input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faNoteSticky} className="icon" />
              <input
                className="input"
                type="text"
                placeholder="Notation"
                value={notation}
                onChange={(event) => setNotation(event.target.value)}
              />
            </div>
          </label>
          <input
            className="submit-button form-data"
            type="submit"
            value="Create New Accommodation"
          />
        </form>
      </div>
    </div>
  );
}

export default AddAccommodationCard;
