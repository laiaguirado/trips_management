import React, { useState } from "react";
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
      price,
      currency,
      type,
      typeDetails,
      origin,
      destination,
      departure,
      arrival,
      web,
      notation,
      resourceType: "transportation",
    });
  };

  return (
    <div className="add-transportation-card">
      <div className="return-icon" onClick={adding}>
        <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
      </div>
      <form className="add-transportation" onSubmit={(e) => add(e)}>
        <h1>New Transportation</h1>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faPersonWalkingLuggage} />
            <input
              type="text"
              placeholder="Transport's name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div>
            <FontAwesomeIcon icon={faTruckPlane} />
            <select
              required
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value="Select...">Select a transportation</option>
              <option value="airplane">Airplane</option>
              <option value="ship">Ship</option>
              <option value="car">Car</option>
              <option value="subway">Subway</option>
              <option value="tram">Tram</option>
              <option value="bus">Bus</option>
              <option value="train">Train</option>
            </select>
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faTicket} />
            <input
              type="text"
              placeholder="Terminal, number bus, ..."
              value={typeDetails}
              onChange={(event) => setTypeDetails(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faSackDollar} />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
          <select
            required
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
          >
            <option value="Select...">Select a currency</option>
            <option value="€">Euro €</option>
            <option value="$">Dollar $</option>
            <option value="£">Libra £</option>
          </select>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faPlaneDeparture} />
            <input
              type="text"
              placeholder="Origin's place"
              value={origin}
              onChange={(event) => setOrigin(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faPlaneArrival} />
            <input
              type="text"
              placeholder="Destination's place"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faCalendar} />
            <input
              type="datetime-local"
              placeholder="Departure time"
              value={departure}
              onChange={(event) => setDeparture(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faCalendar} />
            <input
              type="datetime-local"
              placeholder="Arrival time"
              value={arrival}
              onChange={(event) => setArrival(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faGlobe} />
            <input
              type="text"
              placeholder="Web"
              value={web}
              onChange={(event) => setWeb(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faNoteSticky} />
            <input
              type="text"
              placeholder="Notes"
              value={notation}
              onChange={(event) => setNotation(event.target.value)}
            />
          </div>
        </label>
        <input type="submit" value="Create New Transportation" />
      </form>
    </div>
  );
}

export default AddTransportationCard;
