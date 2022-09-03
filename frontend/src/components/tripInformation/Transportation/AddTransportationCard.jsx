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
  faRankingStar,
} from "@fortawesome/free-solid-svg-icons";

function AddTransportationCard({ onAdd, message, adding, tripId }) {
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
  const [rating, setRating] = useState("");
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
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = ("0" + date.getFullYear()).slice(-4);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    return day + "/" + month + "/" + year + " " + hours + ":" + minutes;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="add-card add-transportation-card">
      <div className="background" onClick={adding}></div>
      <div className="form-container">
        <div className="return-icon" onClick={adding}>
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <form className="add-form" onSubmit={(e) => add(e)}>
          <h1 className="title">New Transportation</h1>
          <div className="error">{message}</div>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faPersonWalkingLuggage} className="icon" />
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
                maxLength="500"
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
              <FontAwesomeIcon icon={faPlaneDeparture} className="icon" />
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
              <FontAwesomeIcon icon={faPlaneArrival} className="icon" />
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
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faCalendar} className="icon" />
              <input
                className="input date"
                placeholder="Departure time"
                max={arrival}
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
                min={departure}
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
              <FontAwesomeIcon icon={faRankingStar} className="icon" />
              <select
                className="input date rating"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
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
            value="Create New Transportation"
          />
        </form>
      </div>
    </div>
  );
}

export default AddTransportationCard;
