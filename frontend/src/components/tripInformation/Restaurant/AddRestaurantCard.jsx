import React, { useState, useEffect } from "react";
import "./AddRestaurantCard.css";
import * as helper from "../../../helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faBan,
  faPersonWalkingLuggage,
  faPhone,
  faGlobe,
  faUtensils,
  faSackDollar,
  faAngleLeft,
  faNoteSticky,
  faEnvelope,
  faBagShopping,
  faStar,
  faBookOpen,
  faRankingStar,
} from "@fortawesome/free-solid-svg-icons";

function AddRestaurantCard({ onAdd, message, adding, tripId }) {
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
  const [takeAway, setTakeAway] = useState(null);
  const [reserved, setReserved] = useState(null);
  const [web, setWeb] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [score, setScore] = useState("");
  const [notation, setNotation] = useState("");
  const [takeAwayChecked, setTakeAwayChecked] = useState([false, false]);
  const [reservedChecked, setReservedChecked] = useState([false, false]);

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
      score,
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="add-card add-restaurant-card">
      <div className="background" onClick={adding}></div>
      <div className="form-container">
        <div className="return-icon" onClick={adding}>
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <form className="add-form" onSubmit={(e) => add(e)}>
          <h1 className="title">New Restaurant</h1>
          <div className="error">{message}</div>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faPersonWalkingLuggage} className="icon" />
              <input
                className="input"
                maxLength="50"
                required
                type="text"
                placeholder="Restaurant's name *"
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
                maxLength="200"
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
              <FontAwesomeIcon icon={faUtensils} className="icon" />
              <input
                list="kindsOfFood"
                className="input"
                type="text"
                placeholder="Kind of Food"
                value={kindOfFood}
                onChange={(event) => setKindOfFood(event.target.value)}
              />
            </div>
          </label>
          <datalist id="kindsOfFood">
            <option value="Fast Food" />
            <option value="Buffet" />
            <option value="Japanese" />
            <option value="Chinese" />
            <option value="Mexican" />
            <option value="Take Away" />
            <option value="Cocktail bar" />
          </datalist>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faSackDollar} className="icon" />
              <input
                className="input price"
                min="0"
                step="0.01"
                type="number"
                required={currency && !maxPrice ? "required" : ""}
                placeholder="Min price"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
              />
              <select
                className="input date"
                required={minPrice ? "required" : ""}
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
              >
                <option value="">Select a currency</option>
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
                className="input price"
                min={minPrice}
                step="0.01"
                type="number"
                required={currency && !minPrice ? "required" : ""}
                placeholder="Max price"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
              />
              <select
                className="input date"
                required={maxPrice ? "required" : ""}
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
              >
                <option value="">Select a currency</option>
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
              <p className="checkbox-placeholder">Can it be taken away?</p>
              <div>
                <input
                  name="takeAway"
                  type="radio"
                  value={true}
                  onClick={(e) => {
                    helper.changeBoolean(
                      e,
                      true,
                      setTakeAway,
                      takeAwayChecked,
                      setTakeAwayChecked
                    );
                  }}
                />
                <label className="checkbox-option">Yes</label>
                <input
                  name="takeAway"
                  type="radio"
                  value={false}
                  onClick={(e) => {
                    helper.changeBoolean(
                      e,
                      false,
                      setTakeAway,
                      takeAwayChecked,
                      setTakeAwayChecked
                    );
                  }}
                />
                <label className="checkbox-option">No</label>
              </div>
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faBookOpen} className="icon" />
              <p className="checkbox-placeholder">Do you have to book?</p>
              <div>
                <input
                  name="reserved"
                  type="radio"
                  value={true}
                  onClick={(e) => {
                    helper.changeBoolean(
                      e,
                      true,
                      setReserved,
                      reservedChecked,
                      setReservedChecked
                    );
                  }}
                />
                <label className="checkbox-option">Yes</label>
                <input
                  name="reserved"
                  type="radio"
                  value={false}
                  onClick={(e) => {
                    helper.changeBoolean(
                      e,
                      false,
                      setReserved,
                      reservedChecked,
                      setReservedChecked
                    );
                  }}
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
                pattern="[0-9]{9}"
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
              <FontAwesomeIcon icon={faRankingStar} className="icon" />
              <select
                className="input date rating"
                value={score}
                onChange={(event) => setScore(event.target.value)}
              >
                <option value="">Rating</option>
                <option value="5">
                  &#xf005;&#xf005;&#xf005;&#xf005;&#xf005;
                </option>
                <option value="4">&#xf005;&#xf005;&#xf005;&#xf005;</option>
                <option value="3">&#xf005;&#xf005;&#xf005;</option>
                <option value="2">&#xf005;&#xf005;</option>
                <option value="1">&#xf005;</option>
              </select>
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faNoteSticky} className="icon" />
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
          <input
            className="submit-button form-data"
            type="submit"
            value="Create New Restaurant"
          />
        </form>
      </div>
    </div>
  );
}

export default AddRestaurantCard;
