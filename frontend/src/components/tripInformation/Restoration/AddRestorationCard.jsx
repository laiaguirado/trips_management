import React, { useState } from "react";
import "./AddRestorationCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faBan,
  faBurger,
  faPhone,
  faGlobe,
  faUtensils,
  faSackDollar,
  faAngleLeft,
  faNoteSticky,
  faEnvelope,
  faDollar,
  faBagShopping,
  faStar,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

function AddRestorationCard({ onAdd, adding, tripId }) {
  const [name, setName] = useState("");
  const [kindOfFood, setKindOfFood] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [closed, setClosed] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [takeAway, setTakeAway] = useState(null);
  const [reserved, setReserved] = useState(null);
  const [web, setWeb] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notation, setNotation] = useState("");

  const add = (e) => {
    e.preventDefault();
    onAdd(tripId, {
      name,
      kindOfFood,
      location,
      minPrice,
      maxPrice,
      currency,
      closed,
      speciality,
      takeAway,
      reserved,
      web,
      phone,
      email,
      description: notation,
      resourceType: "Restoration",
    });
  };

  return (
    <div className="add-card add-restoration-card">
      <div className="form-container">
        <div className="return-icon" onClick={adding}>
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <form className="add-form" onSubmit={(e) => add(e)}>
          <h1 className="title">New Restoration</h1>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faUtensils} className="icon" />
              <input
                className="input"
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faBurger} className="icon" />
              <input
                className="input"
                type="text"
                placeholder="Kind of Food"
                value={kindOfFood}
                onChange={(event) => setKindOfFood(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faLocationDot} className="icon" />
              <input
                className="input"
                required
                type="text"
                placeholder="Location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faSackDollar} className="icon" />
              <input
                className="input"
                type="number"
                placeholder="Min price"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faDollar} className="icon" />
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
              <FontAwesomeIcon icon={faSackDollar} className="icon" />
              <input
                className="input"
                type="number"
                placeholder="Max price"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faDollar} className="icon" />
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
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faBan} className="icon" />
              <input
                className="input"
                type="text"
                placeholder="Closed"
                value={closed}
                onChange={(event) => setClosed(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faStar} className="icon" />
              <input
                className="input"
                type="text"
                placeholder="Speciality"
                value={speciality}
                onChange={(event) => setSpeciality(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faBagShopping} className="icon" />
              <input
                className="input"
                type="checkbox"
                placeholder="Take away"
                value={takeAway}
                onChange={(event) => setTakeAway(event.target.checked)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faBookOpen} className="icon" />
              <input
                className="input"
                type="checkbox"
                placeholder="Reserved"
                value={reserved}
                onChange={(event) => setReserved(event.target.checked)}
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
              <FontAwesomeIcon icon={faPhone} className="icon" />
              <input
                className="input"
                type="tel"
                placeholder="Phone number"
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
              <FontAwesomeIcon icon={faNoteSticky} className="icon" />
              <input
                className="input"
                type="text"
                placeholder="Notes"
                value={notation}
                onChange={(event) => setNotation(event.target.value)}
              />
            </div>
          </label>
          <input
            className="submit-button form-data"
            type="submit"
            value="Create New Restoration"
          />
        </form>
      </div>
    </div>
  );
}

export default AddRestorationCard;
