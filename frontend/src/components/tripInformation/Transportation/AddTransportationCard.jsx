import React, { useState, useEffect } from "react";
import "./AddTransportationCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faTruckPlane,
  faTicket,
  faPersonWalkingLuggage,
  faPlaneDeparture,
  faPlaneArrival,
  faSackDollar,
  faCalendar,
  faAngleLeft,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";

function AddTransportationCard({ onAdd, adding, tripId }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [typeDetails, setTypeDetails] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [web, setWeb] = useState("");
  const [notation, setNotation] = useState("");

  const add = (e) => {
    e.preventDefault();
    onAdd(tripId, {
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

  function getDateValue(value, placeholder) {
    if (value === "" || value === undefined) {
      return placeholder;
    }
    const date = new Date(value);
    const month = date.getMonth() + 1;
    const stringDate =
      date.getDate() +
      "/" +
      month +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes();
    return stringDate;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="add-card add-transportation-card">
      <div className="form-container">
        <div className="return-icon" onClick={adding}>
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <form className="add-form" onSubmit={(e) => add(e)}>
          <h1 className="title">New Transportation</h1>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faPersonWalkingLuggage} className="icon" />
              <input
                className="input"
                required
                type="text"
                placeholder="Transport's name *"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faTruckPlane} className="icon" />
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
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faTicket} className="icon" />
              <input
                className="input"
                type="text"
                placeholder="Terminal, number bus, ..."
                value={typeDetails}
                onChange={(event) => setTypeDetails(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faSackDollar} className="icon" />
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
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faPlaneDeparture} className="icon" />
              <input
                className="input"
                type="text"
                placeholder="Origin's place"
                value={origin}
                onChange={(event) => setOrigin(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faPlaneArrival} className="icon" />
              <input
                className="input"
                type="text"
                placeholder="Destination's place"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faCalendar} className="icon" />
              <input
                className="input date"
                placeholder="Departure time"
                onFocus={(event) => {
                  event.target.type = "datetime-local";
                  event.target.value = departure;
                }}
                onBlur={(event) => {
                  event.target.type = "text";
                  event.target.value = getDateValue(
                    departure,
                    "Departure time"
                  );
                }}
                onChange={(event) => setDeparture(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faCalendar} className="icon" />
              <input
                className="input date"
                placeholder="Arrival time"
                onFocus={(event) => {
                  event.target.type = "datetime-local";
                  event.target.value = arrival;
                }}
                onBlur={(event) => {
                  event.target.type = "text";
                  event.target.value = getDateValue(arrival, "Arrival time");
                }}
                onChange={(event) => {
                  setArrival(event.target.value);
                }}
              />
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
              <FontAwesomeIcon icon={faNoteSticky} className="icon" />
              <textarea
                className="input description"
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
            value="Create New Transportation"
          />
        </form>
      </div>
    </div>
  );
}

export default AddTransportationCard;
