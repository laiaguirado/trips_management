import React, { useState } from "react";
import "./EditRestaurantCard.css";
import * as helper from "../../../helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";

function EditRestaurantCard({ restaurant, restaurantId, onEdit }) {
  const [name, setName] = useState(restaurant.name);
  const [kindOfFood, setKindOfFood] = useState(restaurant.kindOfFood);
  const [location, setLocation] = useState(restaurant.location);
  const [minPrice, setMinPrice] = useState(restaurant.minPrice);
  const [maxPrice, setMaxPrice] = useState(restaurant.maxPrice);
  const [currency, setCurrency] = useState(restaurant.currency);
  const [closed, setClosed] = useState(restaurant.closed);
  const [openingHour, setOpeningHour] = useState(restaurant.openingHour);
  const [closingHour, setClosingHour] = useState(restaurant.closingHour);
  const [speciality, setSpeciality] = useState(restaurant.speciality);
  const [takeAway, setTakeAway] = useState(restaurant.takeAway);
  const [reserved, setReserved] = useState(restaurant.reserved);
  const [web, setWeb] = useState(restaurant.web);
  const [phone, setPhone] = useState(restaurant.phone);
  const [email, setEmail] = useState(restaurant.email);
  const [score, setScore] = useState(
    restaurant.scores[0] ? restaurant.scores[0].score : ""
  );
  const [notation, setNotation] = useState(restaurant.notation);
  const [takeAwayChecked, setTakeAwayChecked] = useState([
    takeAway ? true : false,
    takeAway ? false : takeAway !== null ? true : false,
  ]);
  const [reservedChecked, setReservedChecked] = useState([
    reserved ? true : false,
    reserved ? false : reserved !== null ? true : false,
  ]);

  const update = (e) => {
    e.preventDefault();
    onEdit(
      restaurantId,
      {
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
      },
      score
    );
  };

  return (
    <div className="restaurant-card edit-card">
      <div className="restaurant-info">
        <form className="add-form" onSubmit={(e) => update(e)}>
          <div className="restaurant-name restaurant-detail">
            <label>
              <input
                className="input edit-name"
                maxLength="50"
                required
                type="text"
                placeholder="Restaurant's name *"
                defaultValue={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
          </div>
          <div className="restaurant-rating restaurant-detail">
            <h3>Rating: </h3>
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
          </div>
          <div className="restaurant-location restaurant-detail">
            <h3>Location: </h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    className="input"
                    maxLength="200"
                    required
                    type="text"
                    placeholder="Location *"
                    defaultValue={location}
                    onChange={(event) => setLocation(event.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="restaurant-kindOfFood restaurant-detail">
            <h3>Kind of Food: </h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    list="kindsOfFood"
                    className="input"
                    type="text"
                    placeholder="Kind of Food"
                    defaultValue={kindOfFood}
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
            </div>
          </div>

          <div className="restaurant-price restaurant-detail">
            <h3>Price (min - max):</h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    className="input price"
                    type="number"
                    min="0"
                    step="0.01"
                    required={currency && !maxPrice ? "required" : ""}
                    placeholder="Min price"
                    defaultValue={minPrice}
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
                  <input
                    className="input price"
                    type="number"
                    min={minPrice}
                    step="0.01"
                    required={currency && !minPrice ? "required" : ""}
                    placeholder="Max price"
                    defaultValue={maxPrice}
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
            </div>
          </div>

          <div className="restaurant-hours restaurant-detail">
            <h3>Opening hour - Closing Hour:</h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    className="input date"
                    placeholder="Opening hour"
                    defaultValue={openingHour}
                    onFocus={(event) => (event.target.type = "time")}
                    onBlur={(event) => (event.target.type = "text")}
                    onChange={(event) => setOpeningHour(event.target.value)}
                  />
                </div>
              </label>
              <label>
                <div className="form-data">
                  <input
                    className="input date"
                    placeholder="Closing Hour"
                    defaultValue={closingHour}
                    onFocus={(event) => (event.target.type = "time")}
                    onBlur={(event) => (event.target.type = "text")}
                    onChange={(event) => setClosingHour(event.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="restaurant-closed restaurant-detail">
            <h3>Closed: </h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    className="input"
                    type="text"
                    placeholder="Closed"
                    defaultValue={closed}
                    onChange={(event) => setClosed(event.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="restaurant-speciality restaurant-detail">
            <h3>Speciality of the restaurant: </h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    className="input"
                    type="text"
                    placeholder="Speciality"
                    defaultValue={speciality}
                    onChange={(event) => setSpeciality(event.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="restaurant-takeAway restaurant-detail">
            <h3>Take Away: </h3>
            <div>
              <label>
                <div className="edit-checkbox">
                  <div>
                    <input
                      name="takeAway"
                      type="radio"
                      value={true}
                      checked={takeAway === true}
                      onClick={(e) => {
                        helper.changeBoolean(
                          e,
                          true,
                          setTakeAway,
                          takeAwayChecked,
                          setTakeAwayChecked
                        );
                      }}
                      onChange={(e) => {}}
                    />
                    <label className="checkbox-option">Yes</label>
                    <input
                      name="takeAway"
                      type="radio"
                      value={false}
                      checked={takeAway === false}
                      onClick={(e) => {
                        helper.changeBoolean(
                          e,
                          false,
                          setTakeAway,
                          takeAwayChecked,
                          setTakeAwayChecked
                        );
                      }}
                      onChange={(e) => {}}
                    />
                    <label className="checkbox-option">No</label>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="restaurant-reserved restaurant-detail">
            <h3>Reservation required: </h3>
            <div>
              <label>
                <div className="edit-checkbox">
                  <div>
                    <input
                      name="reserved"
                      type="radio"
                      value={true}
                      checked={reserved === true}
                      onClick={(e) => {
                        helper.changeBoolean(
                          e,
                          true,
                          setReserved,
                          reservedChecked,
                          setReservedChecked
                        );
                      }}
                      onChange={(e) => {}}
                    />
                    <label className="checkbox-option">Yes</label>
                    <input
                      name="reserved"
                      type="radio"
                      value={false}
                      checked={reserved === false}
                      onClick={(e) => {
                        helper.changeBoolean(
                          e,
                          false,
                          setReserved,
                          reservedChecked,
                          setReservedChecked
                        );
                      }}
                      onChange={(e) => {}}
                    />
                    <label className="checkbox-option">No</label>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="restaurant-web restaurant-detail">
            <h3>Web page: </h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    className="input"
                    type="text"
                    placeholder="Web"
                    defaultValue={web}
                    onChange={(event) => setWeb(event.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="restaurant-phone restaurant-detail">
            <h3>Phone number: </h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    className="input"
                    pattern="[0-9]{9}"
                    type="tel"
                    placeholder="Phone number"
                    defaultValue={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="restaurant-email restaurant-detail">
            <h3>Email: </h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    defaultValue={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="restaurant-notation restaurant-detail">
            <h3>Notes: </h3>
            <div className="notation-text">
              <label>
                <div className="form-data">
                  <textarea
                    className="input description"
                    maxLength="500"
                    rows="5"
                    cols="30"
                    placeholder="Notes"
                    defaultValue={notation}
                    onChange={(event) => setNotation(event.target.value)}
                  ></textarea>
                </div>
              </label>
            </div>
          </div>
          <input
            className="submit-button form-data"
            type="submit"
            value="Edit Restaurant"
          />
        </form>
      </div>
    </div>
  );
}

export default EditRestaurantCard;
