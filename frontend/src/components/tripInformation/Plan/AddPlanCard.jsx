import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faBan,
  faHourglass,
  faPhone,
  faGlobe,
  faPersonWalkingLuggage,
  faSackDollar,
  faAngleLeft,
  faNoteSticky,
  faEnvelope,
  faPercent,
} from "@fortawesome/free-solid-svg-icons";

function AddPlanCard({ onAdd, adding, tripId }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [openingHour, setOpeningHour] = useState("");
  const [closingHour, setClosingHour] = useState("");
  const [closed, setClosed] = useState("");
  const [duration, setDuration] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [web, setWeb] = useState("");
  const [priceAdult, setPriceAdult] = useState("");
  const [priceChildren, setPriceChildren] = useState("");
  const [discount, setDiscount] = useState("");
  const [notation, setNotation] = useState("");

  const add = (e) => {
    e.preventDefault();
    onAdd(tripId, {
      name,
      location,
      openingHour,
      closingHour,
      closed,
      duration,
      phone,
      email,
      web,
      priceAdult,
      priceChildren,
      discount,
      notation,
      resourceType: "plans",
    });
  };

  return (
    <div className="add-plan-card">
      <div className="return-icon" onClick={adding}>
        <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
      </div>
      <form className="addplan" onSubmit={(e) => add(e)}>
        <h1>New Plan</h1>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faPersonWalkingLuggage} />
            <input
              type="text"
              placeholder="Plan's name"
              value={name}
              onChange={(event) => setName(event.target.value)}
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
            <FontAwesomeIcon icon={faClock} />
            <input
              type="time"
              placeholder="Opening hour"
              value={openingHour}
              onChange={(event) => setOpeningHour(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faClock} />
            <input
              type="time"
              placeholder="Closing hour"
              value={closingHour}
              onChange={(event) => setClosingHour(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faBan} />
            <input
              type="text"
              placeholder="Closed"
              value={closed}
              onChange={(event) => setClosed(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faHourglass} />
            <input
              type="text"
              placeholder="Duration"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
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
            <FontAwesomeIcon icon={faSackDollar} />
            <input
              type="text"
              placeholder="Adult's price"
              value={priceAdult}
              onChange={(event) => setPriceAdult(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faSackDollar} />
            <input
              type="text"
              placeholder="Children's price"
              value={priceChildren}
              onChange={(event) => setPriceChildren(event.target.value)}
            />
          </div>
        </label>
        <label>
          <div className="form-data">
            <FontAwesomeIcon icon={faPercent} />
            <input
              type="text"
              placeholder="Discount"
              value={discount}
              onChange={(event) => setDiscount(event.target.value)}
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

export default AddPlanCard;
