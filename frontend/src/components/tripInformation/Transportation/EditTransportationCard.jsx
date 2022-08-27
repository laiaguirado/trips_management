import React, { useEffect, useState } from "react";
import "./EditTransportationCard.css";

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
  const [notation, setNotation] = useState(transportation.notation);

  function setDateValue(value) {
    if (value === "" || value === undefined || value === null) {
      return "";
    }
    return value;
  }

  //todo message errors
  //todo remove edit option when not necessary
  const update = (e) => {
    e.preventDefault();
    onEdit(transportationId, {
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
    });
  };

  return (
    <div className="transportation-card edit-card">
      <h1 className="details-title">TRANSPORTATION</h1>
      <div className="transportation-info">
        <form className="add-form" onSubmit={(e) => update(e)}>
          <div className="transportation-name transportation-detail">
            <h3>Name: </h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    className="input"
                    maxLength="50"
                    required
                    type="text"
                    placeholder="Transport's name *"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
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
                    value={type}
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
                    value={typeDetails}
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
                    type="number"
                    min={0}
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
                    value={origin}
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
                    value={destination}
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
                    defaultValue={departure.substring(0, 16)}
                    onFocus={(event) => {
                      event.target.value = departure.substring(0, 16);
                    }}
                    onBlur={(event) => {
                      event.target.value = departure.substring(0, 16);
                    }}
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
                    defaultValue={arrival.substring(0, 16)}
                    onFocus={(event) => {
                      event.target.value = arrival.substring(0, 16);
                    }}
                    onBlur={(event) => {
                      event.target.value = arrival.substring(0, 16);
                    }}
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
                    value={web}
                    onChange={(event) => setWeb(event.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="transportation-notation transportation-detail">
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
            value="Update Transportation"
          />
        </form>
      </div>
    </div>
  );
}

export default EditTransportationCard;
