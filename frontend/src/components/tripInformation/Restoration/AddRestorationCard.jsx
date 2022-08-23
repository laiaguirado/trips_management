import React, { useState } from "react";
import "./AddRestorationCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faBan,
  faBurger,
  faPhone,
  faGlobe,
  faUtensils,
  faSackDollar,
  faAngleLeft,
  faNoteSticky,
  faEnvelope,
  faDollar,
  faBagShopping,
  faStar,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

function AddRestorationCard({ onAdd, adding, tripId }) {
  const [name, setName] = useState("");
  const [kindOfFood, setKindOfFood] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [closed, setClosed] = useState("");
  const [openingHour, setOpeningHour] = useState("");
  const [closingHour, setClosingHour] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [takeAway, setTakeAway] = useState(undefined);
  const [reserved, setReserved] = useState(undefined);
  const [web, setWeb] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notation, setNotation] = useState("");

  const add = (e) => {
    e.preventDefault();
    onAdd(tripId, {
      name,
      kindOfFood,
      location,
      minPrice,
      maxPrice,
      currency,
      openingHour,
      closingHour,
      closed,
      speciality,
      takeAway,
      reserved,
      web,
      phone,
      email,
      notation,
    });
  };

  return (
    <div className="add-card add-restoration-card">
      <div className="form-container">
        <div className="return-icon" onClick={adding}>
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <form className="add-form" onSubmit={(e) => add(e)}>
          <h1 className="title">New Restoration</h1>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faUtensils} className="icon" />
              <input
                className="input"
                required
                type="text"
                placeholder="Restoration's name"
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
              <FontAwesomeIcon icon={faBurger} className="icon" />
              <input
                className="input"
                type="text"
                placeholder="Kind of Food"
                value={kindOfFood}
                onChange={(event) => setKindOfFood(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faSackDollar} className="icon" />
              <input
                className="input"
                type="number"
                min={0}
                placeholder="Min price"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faDollar} className="icon" />
              <select
                className="input date"
                required={minPrice ? "required" : ""}
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
              <FontAwesomeIcon icon={faSackDollar} className="icon" />
              <input
                className="input"
                type="number"
                min={minPrice}
                placeholder="Max price"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faDollar} className="icon" />
              <select
                className="input date"
                required={maxPrice ? "required" : ""}
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
              <FontAwesomeIcon icon={faClock} className="icon" />
              <input
                className="input date"
                placeholder="Opening Hour"
                value={openingHour}
                onFocus={(event) => (event.target.type = "time")}
                onBlur={(event) => (event.target.type = "text")}
                onChange={(event) => setOpeningHour(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faClock} className="icon" />
              <input
                className="input date"
                placeholder="Closing Hour"
                value={closingHour}
                onFocus={(event) => (event.target.type = "time")}
                onBlur={(event) => (event.target.type = "text")}
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
              <FontAwesomeIcon icon={faStar} className="icon" />
              <input
                className="input"
                type="text"
                placeholder="Speciality"
                value={speciality}
                onChange={(event) => setSpeciality(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faBagShopping} className="icon" />
              <p>Can it be taken away?</p>
              <div>
                <input
                  name="takeAway"
                  type="radio"
                  value={takeAway}
                  onChange={() => setTakeAway(true)}
                />
                <label>Yes</label>
                <input
                  name="takeAway"
                  type="radio"
                  value={takeAway}
                  onChange={() => setTakeAway(false)}
                />
                <label>No</label>
              </div>
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faBookOpen} className="icon" />
              <p>Do you have to book?</p>
              <div>
                <input
                  name="reserved"
                  type="radio"
                  value={reserved}
                  onChange={() => setReserved(true)}
                />
                <label>Yes</label>
                <input
                  name="reserved"
                  type="radio"
                  value={reserved}
                  onChange={() => setReserved(false)}
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
            value="Create New Restoration"
          />
        </form>
      </div>
    </div>
  );
}

export default AddRestorationCard;
