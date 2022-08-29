import React, { useEffect, useState } from "react";
import "./EditAccommodationCard.css";

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
  const [notation, setNotation] = useState(accommodation.notation);

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
  //todo edit dates inputs
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
      breakfast,
      board,
      web,
      phone,
      email,
      notation,
    });
  };
  return (
    <div className="accommodation-card edit-card">
      <h1 className="details-title">ACCOMMODATION</h1>
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
                    onChange={(event) => selectType(event.target.value)}
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
                    placeholder="Start Date"
                    type="date"
                    max={endDate}
                    defaultValue={startDate}
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
                    type="date"
                    min={startDate}
                    defaultValue={endDate}
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
                <div className="edit-checkbox">
                  <div>
                    <input
                      name="petFriendly"
                      type="radio"
                      value={true}
                      checked={petFriendly === true}
                      onChange={() => setPetFriendly(true)}
                    />
                    <label className="checkbox-option">Yes</label>
                    <input
                      name="petFriendly"
                      type="radio"
                      value={false}
                      checked={petFriendly === false}
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
              <div className="edit-checkbox">
                <div>
                  <input
                    name="internet"
                    type="radio"
                    value={true}
                    checked={internet === true}
                    onChange={() => setInternet(true)}
                  />
                  <label className="checkbox-option">Yes</label>
                  <input
                    name="internet"
                    type="radio"
                    value={false}
                    checked={internet === false}
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
              <div className="edit-checkbox">
                <div>
                  <input
                    name="swimmingPool"
                    type="radio"
                    value={true}
                    checked={swimmingPool === true}
                    onChange={() => setSwimmingPool(true)}
                  />
                  <label className="checkbox-option">Yes</label>
                  <input
                    name="swimmingPool"
                    type="radio"
                    value={false}
                    checked={swimmingPool === false}
                    onChange={() => setSwimmingPool(false)}
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
                        onChange={() => setBreakfast(true)}
                      />
                      <label className="checkbox-option">Yes</label>
                      <input
                        name="breakfastIncluded"
                        type="radio"
                        value={false}
                        checked={breakfast === false}
                        onChange={() => setBreakfast(false)}
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
                        onChange={() => setBoard("Full")}
                      />
                      <label className="checkbox-option">Full</label>
                      <input
                        name="board"
                        type="radio"
                        value={"Half"}
                        checked={board === "Half"}
                        onChange={() => setBoard("Half")}
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
            <h3>Notation: </h3>
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
