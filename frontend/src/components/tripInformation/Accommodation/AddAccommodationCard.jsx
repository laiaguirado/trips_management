import React, { useState, useEffect } from "react";
import "./AddAccommodationCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faLocationDot,
  faCalendar,
  faUtensils,
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
  faRankingStar,
  faMugSaucer,
} from "@fortawesome/free-solid-svg-icons";

function AddAccommodationCard({ onAdd, message, adding, tripId }) {
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
  const [breakfast, setBreakfast] = useState(null);
  const [board, setBoard] = useState(null);
  const [web, setWeb] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [score, setScore] = useState("");
  const [notation, setNotation] = useState("");
  const [petFriendlyChecked, setPetFriendlyChecked] = useState([false, false]);
  const [internetChecked, setInternetChecked] = useState([false, false]);
  const [swimmingPoolChecked, setSwimmingPoolChecked] = useState([
    false,
    false,
  ]);
  const [breakfastChecked, setBreakfastChecked] = useState([false, false]);
  const [boardChecked, setBoardChecked] = useState([false, false]);

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
      breakfast,
      board,
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

  function changePetFriendly(e, option) {
    if (option) {
      const otherValue = petFriendlyChecked[1];
      if (petFriendlyChecked[0]) {
        setPetFriendly(null);
        setPetFriendlyChecked([false, otherValue]);
        e.target.checked = false;
      } else {
        setPetFriendly(true);
        setPetFriendlyChecked([true, false]);
        e.target.checked = true;
      }
    } else {
      const otherValue = petFriendlyChecked[0];
      if (petFriendlyChecked[1]) {
        setPetFriendly(null);
        setPetFriendlyChecked([otherValue, false]);
        e.target.checked = false;
      } else {
        setPetFriendly(false);
        setPetFriendlyChecked([false, true]);
        e.target.checked = true;
      }
    }
  }

  function changeInternet(e, option) {
    if (option) {
      const otherValue = internetChecked[1];
      if (internetChecked[0]) {
        setInternet(null);
        setInternetChecked([false, otherValue]);
        e.target.checked = false;
      } else {
        setInternet(true);
        setInternetChecked([true, false]);
        e.target.checked = true;
      }
    } else {
      const otherValue = internetChecked[0];
      if (internetChecked[1]) {
        setInternet(null);
        setInternetChecked([otherValue, false]);
        e.target.checked = false;
      } else {
        setInternet(false);
        setInternetChecked([false, true]);
        e.target.checked = true;
      }
    }
  }

  function changeSwimmingPool(e, option) {
    if (option) {
      const otherValue = swimmingPoolChecked[1];
      if (swimmingPoolChecked[0]) {
        setSwimmingPool(null);
        setSwimmingPoolChecked([false, otherValue]);
        e.target.checked = false;
      } else {
        setSwimmingPool(true);
        setSwimmingPoolChecked([true, false]);
        e.target.checked = true;
      }
    } else {
      const otherValue = swimmingPoolChecked[0];
      if (swimmingPoolChecked[1]) {
        setSwimmingPool(null);
        setSwimmingPoolChecked([otherValue, false]);
        e.target.checked = false;
      } else {
        setSwimmingPool(false);
        setSwimmingPoolChecked([false, true]);
        e.target.checked = true;
      }
    }
  }

  function changeBreakfast(e, option) {
    if (option) {
      const otherValue = breakfastChecked[1];
      if (breakfastChecked[0]) {
        setBreakfast(null);
        setBreakfastChecked([false, otherValue]);
        e.target.checked = false;
      } else {
        setBreakfast(true);
        setBreakfastChecked([true, false]);
        e.target.checked = true;
      }
    } else {
      const otherValue = breakfastChecked[0];
      if (breakfastChecked[1]) {
        setBreakfast(null);
        setBreakfastChecked([otherValue, false]);
        e.target.checked = false;
      } else {
        setBreakfast(false);
        setBreakfastChecked([false, true]);
        e.target.checked = true;
      }
    }
  }

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
    <div className="add-card add-accommodation-card">
      <div className="background" onClick={adding}></div>
      <div className="form-container">
        <div className="return-icon" onClick={adding}>
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <form className="add-form" onSubmit={(e) => add(e)}>
          <h1 className="title">New Accommodation</h1>
          <div className="error">{message}</div>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faPersonWalkingLuggage} className="icon" />
              <input
                className="input"
                maxLength="50"
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
                <option value="">Select an accommodation type</option>
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
                min="0"
                step="0.01"
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
                <option value="">Select a currency</option>
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
                  value={true}
                  onClick={(e) => {
                    changePetFriendly(e, true);
                  }}
                />
                <label className="checkbox-option">Yes</label>
                <input
                  name="petFriendly"
                  type="radio"
                  value={false}
                  onClick={(e) => {
                    changePetFriendly(e, false);
                  }}
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
                  value={true}
                  onClick={(e) => {
                    changeInternet(e, true);
                  }}
                />
                <label className="checkbox-option">Yes</label>
                <input
                  name="internet"
                  type="radio"
                  value={false}
                  onClick={(e) => {
                    changeInternet(e, false);
                  }}
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
                  value={true}
                  onClick={(e) => {
                    changeSwimmingPool(e, true);
                  }}
                />
                <label className="checkbox-option">Yes</label>
                <input
                  name="swimmingPool"
                  type="radio"
                  value={false}
                  onClick={(e) => {
                    changeSwimmingPool(e, false);
                  }}
                />
                <label className="checkbox-option">No</label>
              </div>
            </div>
          </label>
          {type === "Hotel" ? (
            <>
              <label>
                <div className="form-data">
                  <FontAwesomeIcon icon={faMugSaucer} className="icon" />
                  <p className="checkbox-placeholder">Is breakfast included?</p>
                  <div>
                    <input
                      name="breakfastIncluded"
                      type="radio"
                      value={true}
                      onClick={(e) => {
                        changeBreakfast(e, true);
                      }}
                    />
                    <label className="checkbox-option">Yes</label>
                    <input
                      name="breakfastIncluded"
                      type="radio"
                      value={false}
                      onClick={(e) => {
                        changeBreakfast(e, false);
                      }}
                    />
                    <label className="checkbox-option">No</label>
                  </div>
                </div>
              </label>
              <label>
                <div className="form-data">
                  <FontAwesomeIcon icon={faUtensils} className="icon" />
                  <p className="checkbox-placeholder">Board</p>
                  <div>
                    <input
                      name="board"
                      type="radio"
                      value={"Full"}
                      onClick={(e) => {
                        changeBoard(e, true);
                      }}
                    />
                    <label className="checkbox-option">Full</label>
                    <input
                      name="board"
                      type="radio"
                      value={"Half"}
                      onClick={(e) => {
                        changeBoard(e, false);
                      }}
                    />
                    <label className="checkbox-option">Half</label>
                  </div>
                </div>
              </label>
            </>
          ) : (
            ""
          )}
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
            value="Create New Accommodation"
          />
        </form>
      </div>
    </div>
  );
}

export default AddAccommodationCard;
