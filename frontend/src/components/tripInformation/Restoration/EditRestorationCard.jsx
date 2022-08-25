import React, { useState } from "react";
import "./EditRestorationCard.css";

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
  const [phone, setPhone] = useState(restoration.setPhone);
  const [email, setEmail] = useState(restoration.email);
  const [notation, setNotation] = useState(restoration.notation);

  const update = (e) => {
    e.preventDefault();
    onEdit(restorationId, {
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
    <div className="restoration-card edit-card">
      <h1 className="details-title">RESTORATION</h1>
      <div className="restoration-info">
        <form className="add-form" onSubmit={(e) => update(e)}>
          <div className="restoration-name restoration-detail">
            <h3>Name: </h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    className="input"
                    maxLength="50"
                    required
                    type="text"
                    placeholder="Restoration's name *"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
              </label>
            </div>
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
                    value={location}
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
                    min={0}
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
                  <input
                    className="input price"
                    type="number"
                    min={minPrice}
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
          </div>

          <div className="restoration-hours restoration-detail">
            <h3>Opening hour - Closing Hour:</h3>
            <div>
              <label>
                <div className="form-data">
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
                    value={closed}
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
                    value={speciality}
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
                      value={takeAway}
                      onChange={() => setTakeAway(true)}
                    />
                    <label className="checkbox-option">Yes</label>
                    <input
                      name="takeAway"
                      type="radio"
                      value={takeAway}
                      onChange={() => setTakeAway(false)}
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
                      value={reserved}
                      onChange={() => setReserved(true)}
                    />
                    <label className="checkbox-option">Yes</label>
                    <input
                      name="reserved"
                      type="radio"
                      value={reserved}
                      onChange={() => setReserved(false)}
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
                    value={web}
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
                    value={phone}
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
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="restoration-notation restoration-detail">
            <h3>Notation: </h3>
            <div className="notation-text">
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
