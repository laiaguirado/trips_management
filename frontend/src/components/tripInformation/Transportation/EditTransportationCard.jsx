import React, { useState } from "react";
import "./EditTransportationCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";

function EditTransportationCard({ transportation, transportationId, onEdit }) {
  const [name, setName] = useState(transportation.name);
  const [type, setType] = useState(transportation.type);
  const [typeDetails, setTypeDetails] = useState(transportation.typeDetails);
  const [price, setPrice] = useState(transportation.price);
  const [currency, setCurrency] = useState(transportation.currency);
  const [origin, setOrigin] = useState(transportation.origin);
  const [destination, setDestination] = useState(transportation.destination);
  const [departure, setDeparture] = useState(
    setDateValue(transportation.departure)
  );
  const [arrival, setArrival] = useState(setDateValue(transportation.arrival));
  const [web, setWeb] = useState(transportation.web);
  const [score, setScore] = useState(
    transportation.scores[0] ? transportation.scores[0].score : ""
  );
  const [notation, setNotation] = useState(transportation.notation);

  function setDateValue(value) {
    if (value === "" || value === undefined || value === null) {
      return "";
    }
    let fullDate = new Date(value);
    let date = value.substring(0, 11);
    let hour = fullDate.toLocaleTimeString();
    if (hour.length < 8) {
      hour = "0" + hour;
    }
    return date + hour;
  }

  const update = (e) => {
    e.preventDefault();
    onEdit(
      transportationId,
      {
        name,
        type,
        typeDetails,
        price,
        currency,
        origin,
        destination,
        departure,
        arrival,
        web,
        notation,
      },
      score
    );
  };

  return (
    <div className="transportation-card edit-card">
      <div className="transportation-info">
        <form className="add-form" onSubmit={(e) => update(e)}>
          <div className="transportation-name transportation-detail">
            <label>
              <input
                className="input edit-name"
                maxLength="50"
                required
                type="text"
                placeholder="Transport's name *"
                defaultValue={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
          </div>
          <div className="transportation-rating transportation-detail">
            <h3>Rating: </h3>
            <div>
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
          </div>
          <div className="transportation-type transportation-detail">
            <h3>Type: </h3>
            <div>
              <label>
                <div className="form-data">
                  <select
                    className="input date"
                    required
                    defaultValue={type}
                    onChange={(event) => setType(event.target.value)}
                  >
                    <option value="" disabled={true}>
                      Select a transportation *
                    </option>
                    <option value="airplane">Airplane</option>
                    <option value="ship">Ship</option>
                    <option value="car">Car</option>
                    <option value="subway">Subway</option>
                    <option value="tram">Tram</option>
                    <option value="bus">Bus</option>
                    <option value="train">Train</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </label>
            </div>
          </div>

          <div className="transportation-typeDetails transportation-detail">
            <h3>Type Details: </h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    className="input"
                    maxLength="500"
                    type="text"
                    placeholder="Terminal, number bus, ..."
                    defaultValue={typeDetails}
                    onChange={(event) => setTypeDetails(event.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="transportation-price transportation-detail">
            <h3>Price: </h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    className="input price"
                    required={currency ? "required" : ""}
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
          </div>

          <div className="transportation-location transportation-detail">
            <h3>Origin - Destination:</h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    className="input"
                    maxLength="100"
                    type="text"
                    placeholder="Origin's place"
                    defaultValue={origin}
                    onChange={(event) => setOrigin(event.target.value)}
                  />
                </div>
              </label>
              <label>
                <div className="form-data">
                  <input
                    className="input"
                    maxLength="100"
                    type="text"
                    placeholder="Destination's place"
                    defaultValue={destination}
                    onChange={(event) => setDestination(event.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="transportation-dates transportation-detail">
            <h3>Departure - Arrival:</h3>
            <div>
              {" "}
              <label>
                <div className="form-data">
                  <input
                    className="input date"
                    placeholder="Departure time"
                    type="datetime-local"
                    max={arrival}
                    defaultValue={departure}
                    onChange={(event) => setDeparture(event.target.value)}
                  />
                </div>
              </label>
              <label>
                <div className="form-data">
                  <input
                    className="input date"
                    placeholder="Arrival time"
                    type="datetime-local"
                    min={departure}
                    defaultValue={arrival}
                    onChange={(event) => {
                      setArrival(event.target.value);
                    }}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="transportation-web transportation-detail">
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

          <div className="transportation-notation transportation-detail">
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
            value="Update Transportation"
          />
        </form>
      </div>
    </div>
  );
}

export default EditTransportationCard;
