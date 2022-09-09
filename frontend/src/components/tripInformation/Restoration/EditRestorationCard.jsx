import React, { useState } from "react";
import "./EditRestorationCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";

function EditRestorationCard({ restoration, restorationId, onEdit }) {
  const [name, setName] = useState(restoration.name);
  const [kindOfFood, setKindOfFood] = useState(restoration.kindOfFood);
  const [location, setLocation] = useState(restoration.location);
  const [minPrice, setMinPrice] = useState(restoration.minPrice);
  const [maxPrice, setMaxPrice] = useState(restoration.maxPrice);
  const [currency, setCurrency] = useState(restoration.currency);
  const [closed, setClosed] = useState(restoration.closed);
  const [openingHour, setOpeningHour] = useState(restoration.openingHour);
  const [closingHour, setClosingHour] = useState(restoration.closingHour);
  const [speciality, setSpeciality] = useState(restoration.speciality);
  const [takeAway, setTakeAway] = useState(restoration.takeAway);
  const [reserved, setReserved] = useState(restoration.reserved);
  const [web, setWeb] = useState(restoration.web);
  const [phone, setPhone] = useState(restoration.phone);
  const [email, setEmail] = useState(restoration.email);
  const [score, setScore] = useState(
    restoration.scores[0] ? restoration.scores[0].score : ""
  );
  const [notation, setNotation] = useState(restoration.notation);
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
      restorationId,
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

  function changeTakeAway(e, option) {
    if (option) {
      const otherValue = takeAwayChecked[1];
      if (takeAwayChecked[0]) {
        setTakeAway(null);
        setTakeAwayChecked([false, otherValue]);
        e.target.checked = false;
      } else {
        setTakeAway(true);
        setTakeAwayChecked([true, false]);
        e.target.checked = true;
      }
    } else {
      const otherValue = takeAwayChecked[0];
      if (takeAwayChecked[1]) {
        setTakeAway(null);
        setTakeAwayChecked([otherValue, false]);
        e.target.checked = false;
      } else {
        setTakeAway(false);
        setTakeAwayChecked([false, true]);
        e.target.checked = true;
      }
    }
  }

  function changeReserved(e, option) {
    if (option) {
      const otherValue = reservedChecked[1];
      if (reservedChecked[0]) {
        setReserved(null);
        setReservedChecked([false, otherValue]);
        e.target.checked = false;
      } else {
        setReserved(true);
        setReservedChecked([true, false]);
        e.target.checked = true;
      }
    } else {
      const otherValue = reservedChecked[0];
      if (reservedChecked[1]) {
        setReserved(null);
        setReservedChecked([otherValue, false]);
        e.target.checked = false;
      } else {
        setReserved(false);
        setReservedChecked([false, true]);
        e.target.checked = true;
      }
    }
  }

  return (
    <div className="restoration-card edit-card">
      <div className="restoration-info">
        <form className="add-form" onSubmit={(e) => update(e)}>
          <div className="restoration-name restoration-detail">
            <label>
              <input
                className="input edit-name"
                maxLength="50"
                required
                type="text"
                placeholder="Restoration's name *"
                defaultValue={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
          </div>
          <div className="restoration-rating restoration-detail">
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
          <div className="restoration-location restoration-detail">
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

          <div className="restoration-kindOfFood restoration-detail">
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

          <div className="restoration-price restoration-detail">
            <h3>Price (min - max):</h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    className="input price"
                    type="number"
                    min="0"
                    step="0.01"
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

          <div className="restoration-hours restoration-detail">
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

          <div className="restoration-closed restoration-detail">
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

          <div className="restoration-speciality restoration-detail">
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

          <div className="restoration-takeAway restoration-detail">
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
                        changeTakeAway(e, true);
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
                        changeTakeAway(e, false);
                      }}
                      onChange={(e) => {}}
                    />
                    <label className="checkbox-option">No</label>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="restoration-reserved restoration-detail">
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
                        changeReserved(e, true);
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
                        changeReserved(e, false);
                      }}
                      onChange={(e) => {}}
                    />
                    <label className="checkbox-option">No</label>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="restoration-web restoration-detail">
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

          <div className="restoration-phone restoration-detail">
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

          <div className="restoration-email restoration-detail">
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

          <div className="restoration-notation restoration-detail">
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
            value="Edit Restoration"
          />
        </form>
      </div>
    </div>
  );
}

export default EditRestorationCard;
