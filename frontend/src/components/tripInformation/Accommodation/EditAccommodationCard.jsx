import React, { useEffect, useState } from "react";
import "./EditAccommodationCard.css";
import * as api from "../../../api";
import * as helper from "../../../helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
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

function EditAccommodationCard({ accommodation, accommodationId, onEdit }) {
  const [name, setName] = useState(accommodation.name);
  const [type, setType] = useState(accommodation.type);
  const [location, setLocation] = useState(accommodation.location);
  const [startDate, setStartDate] = useState(getDateValue(accommodation.startDate, "Start Date"));
  const [endDate, setEndDate] = useState(getDateValue(accommodation.endDate, "End Date"));
  const [checkInHour, setCheckInHour] = useState(accommodation.checkInHour);
  const [checkOutHour, setCheckOutHour] = useState(accommodation.checkOutHour);
  const [price, setPrice] = useState(accommodation.price);
  const [currency, setCurrency] = useState(accommodation.currency);
  const [petFriendly, setPetFriendly] = useState(accommodation.petFriendly);
  const [internet, setInternet] = useState(accommodation.internet);
  const [swimmingPool, setSwimmingPool] = useState(accommodation.swimmingPool);
  const [web, setWeb] = useState(accommodation.web);
  const [phone, setPhone] = useState(accommodation.phone);
  const [email, setEmail] = useState(accommodation.email);
  const [notation, setNotation] = useState("");

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

  const update = (e) => {
    e.preventDefault();
    onEdit(accommodationId, {
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

  return (
    <div className="accommodation-card">
      <h1 className="details-title">Accommodation</h1>
      <div className="accommodation-info">
        <form className="add-form" onSubmit={(e) => update(e)}>
          <div className="accommodation-name accommodation-detail">
            <h3>Name: </h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    className="input"
                    required
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>
          <div className="accommodation-type accommodation-detail">
            <h3>Accommodation type: </h3>
            <div>
              <label>
                <div className="form-data">
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
            </div>
          </div>
          <div className="accommodation-location accommodation-detail">
            <h3>Location: </h3>
            <div>
              <label>
                <div className="form-data">
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
            </div>
          </div>
          <div className="accommodation-dates accommodation-detail">
            <h3>Dates:</h3>
            <label>
              <div className="form-data">
                <input
                  id="date"
                  className="input date"
                  placeholder="Start Date"
                  value={startDate}
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
          </div>
          <div className="accommodation-checkHour accommodation-detail">
            <h3>Check In Hour / Check Out Hour:</h3>
            <label>
              <div className="form-data">
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
          </div>
          <div className="accommodation-price accommodation-detail">
            <h3>Price: </h3>
            <label>
              <div className="form-data">
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
          </div>
          <div className="accommodation-petFriendly accommodation-detail">
            <h3>Pet friendly: </h3>
            <div>
              <label>
                <div className="form-data">
                  <div>
                    <input
                      name="petFriendly"
                      type="radio"
                      value={petFriendly}
                      checked={petFriendly}
                      onChange={() => setPetFriendly(true)}
                    />
                    <label className="checkbox-option">Yes</label>
                    <input
                      name="petFriendly"
                      type="radio"
                      value={petFriendly}
                      checked={!petFriendly}
                      onChange={() => setPetFriendly(false)}
                    />
                    <label className="checkbox-option">No</label>
                  </div>
                </div>
              </label>
            </div>
          </div>
          <div className="accommodation-internet accommodation-detail">
            <h3>Internet: </h3>
            <label>
              <div className="form-data">
                <div>
                  <input
                    name="internet"
                    type="radio"
                    value={internet}
                    checked={internet}
                    onChange={() => setInternet(true)}
                  />
                  <label className="checkbox-option">Yes</label>
                  <input
                    name="internet"
                    type="radio"
                    value={internet}
                    checked={!internet}
                    onChange={() => setInternet(false)}
                  />
                  <label className="checkbox-option">No</label>
                </div>
              </div>
            </label>
          </div>
          <div className="accommodation-swimmingPool accommodation-detail">
            <h3>Swimming pool: </h3>
            <label>
              <div className="form-data">
                <div>
                  <input
                    name="swimmingPool"
                    type="radio"
                    value={swimmingPool}
                    checked={swimmingPool}
                    onChange={() => setSwimmingPool(true)}
                  />
                  <label className="checkbox-option">Yes</label>
                  <input
                    name="swimmingPool"
                    type="radio"
                    value={swimmingPool}
                    checked={!swimmingPool}
                    onChange={() => setSwimmingPool(false)}
                  />
                  <label className="checkbox-option">No</label>
                </div>
              </div>
            </label>
          </div>
          <div className="accommodation-web accommodation-detail">
            <h3>Web page: </h3>
            <label>
              <div className="form-data">
                <input
                  className="input"
                  type="text"
                  placeholder="Web"
                  value={web}
                  onChange={(event) => setWeb(event.target.value)}
                />
              </div>
            </label>
          </div>
          <div className="accommodation-phone accommodation-detail">
            <h3>Phone number: </h3>
            <label>
              <div className="form-data">
                <input
                  className="input"
                  pattern="[0-9]{9}"
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
            </label>
          </div>
          <div className="accommodation-email accommodation-detail">
            <h3>Email: </h3>
            <label>
              <div className="form-data">
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </label>
          </div>
          <div className="accommodation-notation accommodation-detail">
            <h3>Notation: </h3>
            <label>
              <div className="form-data">
                <textarea
                  className="input description"
                  maxLength="500"
                  rows="5"
                  cols="30"
                  placeholder="Notes"
                  value={notation}
                  onChange={(event) => setNotation(event.target.value)}
                ></textarea>
              </div>
            </label>
          </div>
          <input
            className="submit-button form-data"
            type="submit"
            value="Update Accommodation"
          />
        </form>
      </div>
    </div>
  );
}

export default EditAccommodationCard;