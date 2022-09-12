import React, { useState } from "react";
import "./EditAccommodationCard.css";
import * as helper from "../../../helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";

function EditAccommodationCard({ accommodation, accommodationId, onEdit }) {
  const [name, setName] = useState(accommodation.name);
  const [type, setType] = useState(accommodation.type);
  const [location, setLocation] = useState(accommodation.location);
  const [startDate, setStartDate] = useState(
    setDateValue(accommodation.startDate)
  );
  const [endDate, setEndDate] = useState(setDateValue(accommodation.endDate));
  const [checkInHour, setCheckInHour] = useState(accommodation.checkInHour);
  const [checkOutHour, setCheckOutHour] = useState(accommodation.checkOutHour);
  const [price, setPrice] = useState(accommodation.price);
  const [currency, setCurrency] = useState(accommodation.currency);
  const [petFriendly, setPetFriendly] = useState(accommodation.petFriendly);
  const [internet, setInternet] = useState(accommodation.internet);
  const [swimmingPool, setSwimmingPool] = useState(accommodation.swimmingPool);
  const [breakfast, setBreakfast] = useState(accommodation.breakfast);
  const [board, setBoard] = useState(accommodation.board);
  const [web, setWeb] = useState(accommodation.web);
  const [phone, setPhone] = useState(accommodation.phone);
  const [email, setEmail] = useState(accommodation.email);
  const [score, setScore] = useState(
    accommodation.scores[0] ? accommodation.scores[0].score : ""
  );
  const [notation, setNotation] = useState(accommodation.notation);
  const [petFriendlyChecked, setPetFriendlyChecked] = useState([
    petFriendly ? true : false,
    petFriendly ? false : petFriendly !== null ? true : false,
  ]);
  const [internetChecked, setInternetChecked] = useState([
    internet ? true : false,
    internet ? false : internet !== null ? true : false,
  ]);
  const [swimmingPoolChecked, setSwimmingPoolChecked] = useState([
    swimmingPool ? true : false,
    swimmingPool ? false : swimmingPool !== null ? true : false,
  ]);
  const [breakfastChecked, setBreakfastChecked] = useState([
    breakfast ? true : false,
    breakfast ? false : breakfast !== null ? true : false,
  ]);
  const [boardChecked, setBoardChecked] = useState([
    board ? true : false,
    board ? false : board !== null ? true : false,
  ]);

  function setDateValue(value) {
    if (value === "" || value === undefined || value === null) {
      return "";
    }
    return value.substring(0, 10);
  }

  const selectType = (value) => {
    if ("Hotel" !== value) {
      setBreakfast(null);
      setBoard(null);
    }
    setType(value);
  };

  const update = (e) => {
    e.preventDefault();
    onEdit(
      accommodationId,
      {
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
        breakfast,
        board,
        web,
        phone,
        email,
        notation,
      },
      score
    );
  };

  function changeBoard(e, option) {
    if (option) {
      const otherValue = boardChecked[1];
      if (boardChecked[0]) {
        setBoard(null);
        setBoardChecked([false, otherValue]);
        e.target.checked = false;
      } else {
        setBoard("Full");
        setBoardChecked([true, false]);
        e.target.checked = true;
      }
    } else {
      const otherValue = boardChecked[0];
      if (boardChecked[1]) {
        setBoard(null);
        setBoardChecked([otherValue, false]);
        e.target.checked = false;
      } else {
        setBoard("Half");
        setBoardChecked([false, true]);
        e.target.checked = true;
      }
    }
  }

  return (
    <div className="accommodation-card edit-card">
      <div className="accommodation-info">
        <form className="add-form" onSubmit={(e) => update(e)}>
          <div className="accommodation-name ">
            <label>
              <input
                className="input edit-name"
                required
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
          </div>
          <div className="accommodation-rating accommodation-detail">
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

          <div className="accommodation-type accommodation-detail">
            <h3>Accommodation type: </h3>
            <div>
              <label>
                <div className="form-data">
                  <select
                    className="input date"
                    value={type}
                    onChange={(event) => selectType(event.target.value)}
                  >
                    <option value="">Select an accommodation</option>
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
                    defaultValue={location}
                    onChange={(event) => setLocation(event.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>
          <div className="accommodation-dates accommodation-detail">
            <h3>Dates:</h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    id="date"
                    className="input date"
                    placeholder={
                      startDate ? helper.localDate(startDate) : "Start Date"
                    }
                    max={endDate ? endDate : "9999-12-31"}
                    onFocus={(event) => {
                      event.target.type = "date";
                      event.target.value = startDate;
                    }}
                    onBlur={(event) => {
                      if (startDate) {
                        event.target.type = "date";
                      } else {
                        event.target.type = "text";
                        event.target.value = "Start Date";
                      }
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
                    placeholder={
                      endDate ? helper.localDate(endDate) : "End Date"
                    }
                    min={startDate}
                    max={"9999-12-31"}
                    onFocus={(event) => {
                      event.target.type = "date";
                      event.target.value = endDate;
                    }}
                    onBlur={(event) => {
                      if (endDate) {
                        event.target.type = "date";
                      } else {
                        event.target.type = "text";
                        event.target.value = "End Date";
                      }
                    }}
                    onChange={(event) => setEndDate(event.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>
          <div className="accommodation-checkHour accommodation-detail">
            <h3>Check In Hour / Check Out Hour:</h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    className="input date"
                    placeholder="Check in Hour"
                    defaultValue={checkInHour}
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
                    defaultValue={checkOutHour}
                    onFocus={(event) => (event.target.type = "time")}
                    onBlur={(event) => (event.target.type = "text")}
                    onChange={(event) => setCheckOutHour(event.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>
          <div className="accommodation-price accommodation-detail">
            <h3>Price: </h3>
            <label>
              <div className="form-data">
                <input
                  className="input price"
                  type="number"
                  min="0"
                  step="0.01"
                  required={currency ? "required" : ""}
                  placeholder="Price"
                  defaultValue={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
                <select
                  className="input date"
                  required={price ? "required" : ""}
                  defaultValue={currency}
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
          <div className="accommodation-petFriendly accommodation-detail">
            <h3>Pet friendly: </h3>
            <div>
              <label>
                <div className="edit-checkbox">
                  <div>
                    <input
                      name="petFriendly"
                      type="radio"
                      value={true}
                      checked={petFriendly === true}
                      onClick={(e) => {
                        helper.changeBoolean(
                          e,
                          true,
                          setPetFriendly,
                          petFriendlyChecked,
                          setPetFriendlyChecked
                        );
                      }}
                      onChange={(e) => {}}
                    />
                    <label className="checkbox-option">Yes</label>
                    <input
                      name="petFriendly"
                      type="radio"
                      value={false}
                      checked={petFriendly === false}
                      onClick={(e) => {
                        helper.changeBoolean(
                          e,
                          false,
                          setPetFriendly,
                          petFriendlyChecked,
                          setPetFriendlyChecked
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
          <div className="accommodation-internet accommodation-detail">
            <h3>Internet: </h3>
            <label>
              <div className="edit-checkbox">
                <div>
                  <input
                    name="internet"
                    type="radio"
                    value={true}
                    checked={internet === true}
                    onClick={(e) => {
                      helper.changeBoolean(
                        e,
                        true,
                        setInternet,
                        internetChecked,
                        setInternetChecked
                      );
                    }}
                    onChange={(e) => {}}
                  />
                  <label className="checkbox-option">Yes</label>
                  <input
                    name="internet"
                    type="radio"
                    value={false}
                    checked={internet === false}
                    onClick={(e) => {
                      helper.changeBoolean(
                        e,
                        false,
                        setInternet,
                        internetChecked,
                        setInternetChecked
                      );
                    }}
                    onChange={(e) => {}}
                  />
                  <label className="checkbox-option">No</label>
                </div>
              </div>
            </label>
          </div>
          <div className="accommodation-swimmingPool accommodation-detail">
            <h3>Swimming pool: </h3>
            <label>
              <div className="edit-checkbox">
                <div>
                  <input
                    name="swimmingPool"
                    type="radio"
                    value={true}
                    checked={swimmingPool === true}
                    onClick={(e) => {
                      helper.changeBoolean(
                        e,
                        true,
                        setSwimmingPool,
                        swimmingPoolChecked,
                        setSwimmingPoolChecked
                      );
                    }}
                    onChange={(e) => {}}
                  />
                  <label className="checkbox-option">Yes</label>
                  <input
                    name="swimmingPool"
                    type="radio"
                    value={false}
                    checked={swimmingPool === false}
                    onClick={(e) => {
                      helper.changeBoolean(
                        e,
                        false,
                        setSwimmingPool,
                        swimmingPoolChecked,
                        setSwimmingPoolChecked
                      );
                    }}
                    onChange={(e) => {}}
                  />
                  <label className="checkbox-option">No</label>
                </div>
              </div>
            </label>
          </div>
          {type === "Hotel" ? (
            <>
              <div className="accommodation-breakfast accommodation-detail">
                <h3>Breakfast included: </h3>
                <label>
                  <div className="edit-checkbox">
                    <div>
                      <input
                        name="breakfastIncluded"
                        type="radio"
                        value={true}
                        checked={breakfast === true}
                        onClick={(e) => {
                          helper.changeBoolean(
                            e,
                            true,
                            setBreakfast,
                            breakfastChecked,
                            setBreakfastChecked
                          );
                        }}
                        onChange={(e) => {}}
                      />
                      <label className="checkbox-option">Yes</label>
                      <input
                        name="breakfastIncluded"
                        type="radio"
                        value={false}
                        checked={breakfast === false}
                        onClick={(e) => {
                          helper.changeBoolean(
                            e,
                            false,
                            setBreakfast,
                            breakfastChecked,
                            setBreakfastChecked
                          );
                        }}
                        onChange={(e) => {}}
                      />
                      <label className="checkbox-option">No</label>
                    </div>
                  </div>
                </label>
              </div>
              <div className="accommodation-board accommodation-detail">
                <h3>Board: </h3>
                <label>
                  <div className="edit-checkbox">
                    <div>
                      <input
                        name="board"
                        type="radio"
                        value={"Full"}
                        checked={board === "Full"}
                        onClick={(e) => {
                          changeBoard(e, true);
                        }}
                        onChange={(e) => {}}
                      />
                      <label className="checkbox-option">Full</label>
                      <input
                        name="board"
                        type="radio"
                        value={"Half"}
                        checked={board === "Half"}
                        onClick={(e) => {
                          changeBoard(e, false);
                        }}
                        onChange={(e) => {}}
                      />
                      <label className="checkbox-option">Half</label>
                    </div>
                  </div>
                </label>
              </div>
            </>
          ) : (
            ""
          )}
          <div className="accommodation-web accommodation-detail">
            <h3>Web page: </h3>
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
          <div className="accommodation-phone accommodation-detail">
            <h3>Phone number: </h3>
            <label>
              <div className="form-data">
                <input
                  className="input"
                  pattern="[0-9]{9}"
                  type="tel"
                  placeholder="Phone"
                  defaultValue={phone}
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
                  defaultValue={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </label>
          </div>
          <div className="accommodation-notation accommodation-detail">
            <h3>Notes: </h3>
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
