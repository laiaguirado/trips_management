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
} from "@fortawesome/free-solid-svg-icons";

function AddRestorationCard({ onAdd, adding, tripId }) {
  //const [name, setName] = useState("");
  const [kindOfFood, setKindOfFood] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [web, setWeb] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  //const [notation, setNotation] = useState("");

  const add = (e) => {
    e.preventDefault();
    onAdd(tripId, {
      //name,
      kindOfFood,
      description,
      location,
      minPrice,
      maxPrice,
      currency,
      web,
      phone,
      email,
      //notation,
      resourceType: "Restoration",
    });
  };

  return (
    <div className="add-restoration-card">
      <div className="return-icon" onClick={adding}>
        <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
      </div>
      <form className="add-restoration" onSubmit={(e) => add(e)}>
        <h1>New Restoration</h1>
        {/*<label>
          <div className="form-data">
            <FontAwesomeIcon icon={faUtensils} />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
  </label>*/}
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faBurger} />
            <input
              type="text"
              placeholder="Kind of Food"
              value={kindOfFood}
              onChange={(event) => setKindOfFood(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faNoteSticky} />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faLocationDot} />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faSackDollar} />
            <input
              type="text"
              placeholder="Min price"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faSackDollar} />
            <input
              type="text"
              placeholder="Max price"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
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
            <FontAwesomeIcon icon={faPhone} />
            <input
              type="text"
              placeholder="Phone number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </label>
        {/*<label>
          <div className="form-data">
            <FontAwesomeIcon icon={faNoteSticky} />
            <input
              type="text"
              placeholder="Notes"
              value={notation}
              onChange={(event) => setNotation(event.target.value)}
            />
          </div>
  </label>*/}
        <input type="submit" value="Create New Restoration" />
      </form>
    </div>
  );
}

export default AddRestorationCard;
