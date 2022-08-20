import React, { useState } from "react";
import "./AddPlanCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faBan,
  faHourglass,
  faPhone,
  faGlobe,
  faPersonWalkingLuggage,
  faSackDollar,
  faAngleLeft,
  faNoteSticky,
  faEnvelope,
  faPercent,
  faDollar,
} from "@fortawesome/free-solid-svg-icons";

function AddPlanCard({ onAdd, adding, tripId }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [openingHour, setOpeningHour] = useState("");
  const [closingHour, setClosingHour] = useState("");
  const [closed, setClosed] = useState("");
  const [duration, setDuration] = useState("");
  const [priceAdult, setPriceAdult] = useState("");
  const [priceChildren, setPriceChildren] = useState("");
  const [currency, setCurrency] = useState("");
  const [discount, setDiscount] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [web, setWeb] = useState("");
  const [notation, setNotation] = useState("");

  const add = (e) => {
    e.preventDefault();
    onAdd(tripId, {
      name,
      location,
      openingHour,
      closingHour,
      closed,
      duration,
      priceAdult,
      priceChildren,
      currency,
      discount,
      phone,
      email,
      web,
      notation,
      resourceType: "plans",
    });
  };

  return (
    <div className="add-card add-plan-card">
      <div className="form-container">
        <div className="return-icon" onClick={adding}>
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <form className="add-form" onSubmit={(e) => add(e)}>
          <h1 className="title">New Plan</h1>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faPersonWalkingLuggage} className="icon" />
              <input
                className="input"
                type="text"
                placeholder="Plan's name"
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
              <FontAwesomeIcon icon={faClock} className="icon" />
              <input
                className="input date"
                type="time"
                placeholder="Opening hour"
                value={openingHour}
                onChange={(event) => setOpeningHour(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faClock} className="icon" />
              <input
                className="input date"
                type="time"
                placeholder="Closing hour"
                value={closingHour}
                onChange={(event) => setClosingHour(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faBan} className="icon" />
              <input
                className="input"
                type="text"
                placeholder="Closed"
                value={closed}
                onChange={(event) => setClosed(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faHourglass} className="icon" />
              <input
                className="input"
                type="text"
                placeholder="Duration"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faSackDollar} className="icon" />
              <input
                className="input"
                type="number"
                placeholder="Adult's price"
                value={priceAdult}
                onChange={(event) => setPriceAdult(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faDollar} className="icon" />
              <select
                className="input date"
                required
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
              >
                <option value="Select...">Select a currency</option>
                <option value="€">Euro €</option>
                <option value="$">Dollar $</option>
                <option value="£">Libra £</option>
              </select>
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faSackDollar} className="icon" />
              <input
                className="input"
                type="number"
                placeholder="Children's price"
                value={priceChildren}
                onChange={(event) => setPriceChildren(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faDollar} className="icon" />
              <select
                className="input date"
                required
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
              >
                <option value="Select...">Select a currency</option>
                <option value="€">Euro €</option>
                <option value="$">Dollar $</option>
                <option value="£">Libra £</option>
              </select>
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faPercent} className="icon" />
              <input
                className="input"
                type="text"
                placeholder="Discount"
                value={discount}
                onChange={(event) => setDiscount(event.target.value)}
              />
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
                placeholder="Phone number"
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
                placeholder="Notes"
                value={notation}
                onChange={(event) => setNotation(event.target.value)}
              />
            </div>
          </label>
          <input
            className="submit-button form-data"
            type="submit"
            value="Create New Transportation"
          />
        </form>
      </div>
    </div>
  );
}

export default AddPlanCard;
