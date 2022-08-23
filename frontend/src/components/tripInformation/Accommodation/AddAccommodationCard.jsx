import React, { useState, useEffect } from "react";
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
  const [petFriendly, setPetFriendly] = useState(undefined);
  const [internet, setInternet] = useState(undefined);
  const [swimmingPool, setSwimmingPool] = useState(undefined);
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

  //todo style margin-top

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function getDateValue(value, placeholder) {
    if (value === "" || value === undefined) {
      return placeholder;
    }
    const date = new Date(value);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = ("0" + date.getFullYear()).slice(-4);
    return day + "/" + month + "/" + year;
  }

  return (
    <div className="add-card add-accommodation-card">
      <div className="background" onClick={adding}></div>
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
                placeholder="Accommodation's name *"
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
                placeholder="Location *"
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
                max={endDate}
                onFocus={(event) => {
                  event.target.type = "date";
                  event.target.value = startDate;
                }}
                onBlur={(event) => {
                  event.target.type = "text";
                  event.target.value = getDateValue(startDate, "Start Date");
                }}
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
                min={startDate}
                onFocus={(event) => {
                  event.target.type = "date";
                  event.target.value = endDate;
                }}
                onBlur={(event) => {
                  event.target.type = "text";
                  event.target.value = getDateValue(endDate, "End Date");
                }}
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
                className="input price"
                type="number"
                min={0}
                placeholder="Price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
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
              <p className="checkbox-placeholder">Is it pet friendly?</p>
              <div>
                <input
                  name="petFriendly"
                  type="radio"
                  value={petFriendly}
                  onChange={() => setPetFriendly(true)}
                />
                <label className="checkbox-option">Yes</label>
                <input
                  name="petFriendly"
                  type="radio"
                  value={petFriendly}
                  onChange={() => setPetFriendly(false)}
                />
                <label className="checkbox-option">No</label>
              </div>
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faWifi} className="icon" />
              <p className="checkbox-placeholder">Is there Wi-Fi?</p>
              <div>
                <input
                  name="internet"
                  type="radio"
                  value={internet}
                  onChange={() => setInternet(true)}
                />
                <label className="checkbox-option">Yes</label>
                <input
                  name="internet"
                  type="radio"
                  value={internet}
                  onChange={() => setInternet(false)}
                />
                <label className="checkbox-option">No</label>
              </div>
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faPersonSwimming} className="icon" />
              <p className="checkbox-placeholder">Is there swimming pool?</p>
              <div>
                <input
                  name="swimmingPool"
                  type="radio"
                  value={swimmingPool}
                  onChange={() => setSwimmingPool(true)}
                />
                <label className="checkbox-option">Yes</label>
                <input
                  name="swimmingPool"
                  type="radio"
                  value={swimmingPool}
                  onChange={() => setSwimmingPool(false)}
                />
                <label className="checkbox-option">No</label>
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
              <textarea
                className="input description"
                rows="5"
                cols="30"
                placeholder="Notes"
                value={notation}
                onChange={(event) => setNotation(event.target.value)}
              ></textarea>
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
