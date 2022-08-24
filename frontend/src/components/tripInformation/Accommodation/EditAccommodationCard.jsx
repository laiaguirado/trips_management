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

function EditAccommodationCard({ accommodation }) {
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
  // const [internet, setInternet] = useState(undefined);
  // const [swimmingPool, setSwimmingPool] = useState(undefined);
  // const [web, setWeb] = useState("");
  // const [phone, setPhone] = useState("");
  // const [email, setEmail] = useState("");
  // const [notation, setNotation] = useState("");

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

  console.log(accommodation.petFriendly);
  return (
    <div className="accommodation-card">
      <h1 className="details-title">Accommodation</h1>
      <div className="accommodation-info">
        <form className="add-form">
          <div className="accommodation-name accommodation-detail">
            <h3>Name: </h3>
            <div>
              <label>
                <div className="form-data">
                  <input className="input" required type="text" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
              </label>
            </div>
          </div>
          <div className="accommodation-type accommodation-detail">
            <h3>Accommodation type: </h3>
            <div>
              <label>
                <div className="form-data">
                  <select className="input date" value={type} onChange={(event) => setType(event.target.value)}>
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
                  <input className="input" required type="text" placeholder="Location *" value={location} onChange={(event) => setLocation(event.target.value)} />
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
                <input className="input price" type="number" min={0} placeholder="Price" value={price} onChange={(event) => setPrice(event.target.value)} />
                <select className="input date" required={price ? "required" : ""} value={currency} onChange={(event) => setCurrency(event.target.value)}>
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
                    <input name="petFriendly" type="radio" value={petFriendly} checked={petFriendly} onChange={() => setPetFriendly(true)} />
                    <label className="checkbox-option">Yes</label>
                    <input name="petFriendly" type="radio" value={petFriendly} checked={!petFriendly} onChange={() => setPetFriendly(false)} />
                    <label className="checkbox-option">No</label>
                  </div>
                </div>
              </label>
            </div>
          </div>
          <div className="accommodation-internet accommodation-detail">
            <h3>Internet: </h3>
            <div>{accommodation.internet !== null && accommodation.internet !== undefined ? (accommodation.internet === true ? "Yes" : "No") : ""}</div>
          </div>
          <div className="accommodation-swimmingPool accommodation-detail">
            <h3>Swimming pool: </h3>
            <div>{accommodation.swimmingPool !== null && accommodation.swimmingPool !== undefined ? (accommodation.swimmingPool === true ? "Yes" : "No") : ""}</div>
          </div>
          <div className="accommodation-web accommodation-detail">
            <h3>Web page: </h3>
            <div>
              {accommodation !== "" ? (
                !accommodation.web.startsWith("https://") && !accommodation.web.startsWith("http://") && accommodation.web !== null && accommodation.web !== "" ? (
                  <a href={"https://" + accommodation.web} target="_blank">
                    {"https://" + accommodation.web}
                  </a>
                ) : (
                  <a href={accommodation.web} target="_blank">
                    {accommodation.web}
                  </a>
                )
              ) : (
                <p></p>
              )}
            </div>
          </div>
          <div className="accommodation-phone accommodation-detail">
            <h3>Phone number: </h3>
            <div>{accommodation.phone}</div>
          </div>
          <div className="accommodation-email accommodation-detail">
            <h3>Email: </h3>
            <div>
              <a href={"mailto:" + accommodation.email}>{accommodation.email}</a>
            </div>
          </div>
          <div className="accommodation-notation accommodation-detail">
            <h3>Notation: </h3>
            <div>{accommodation.notation}</div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAccommodationCard;
