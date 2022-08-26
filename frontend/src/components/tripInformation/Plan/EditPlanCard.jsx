import React, { useState } from "react";
import "./EditPlanCard.css";

function EditPlanCard({ plan, planId, onEdit }) {
  const [name, setName] = useState(plan.name);
  const [location, setLocation] = useState(plan.location);
  const [openingHour, setOpeningHour] = useState(plan.openingHour);
  const [closingHour, setClosingHour] = useState(plan.closingHour);
  const [closed, setClosed] = useState(plan.closed);
  const [duration, setDuration] = useState(plan.duration);
  const [priceAdult, setPriceAdult] = useState(plan.setPriceAdult);
  const [priceChildren, setPriceChildren] = useState(plan.priceChildren);
  const [currency, setCurrency] = useState(plan.currency);
  const [discount, setDiscount] = useState(plan.discount);
  const [phone, setPhone] = useState(plan.phone);
  const [email, setEmail] = useState(plan.email);
  const [web, setWeb] = useState(plan.web);
  const [notation, setNotation] = useState(plan.notation);

  const update = (e) => {
    e.preventDefault();
    onEdit(planId, {
      name,
      location,
      openingHour,
      closingHour,
      closed,
      duration,
      priceAdult,
      priceChildren,
      currency,
      discount,
      phone,
      email,
      web,
      notation,
    });
  };

  return (
    <div className="plan-card edit-card">
      <h1 className="details-title">PLAN</h1>
      <div className="plan-info">
        <form className="add-form" onSubmit={(e) => update(e)}>
          <div className="plan-name plan-detail">
            <h3>Name: </h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    className="input"
                    maxLength="50"
                    required
                    type="text"
                    placeholder="Plan's name *"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>
          <div className="plan-location plan-detail">
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

          <div className="plan-hours plan-detail">
            <h3>Hours (opening - closing):</h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    className="input date"
                    placeholder="Opening hour"
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
                    placeholder="Closing hour"
                    value={closingHour}
                    onFocus={(event) => (event.target.type = "time")}
                    onBlur={(event) => (event.target.type = "text")}
                    onChange={(event) => setClosingHour(event.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="plan-phone plan-detail">
            <h3>Closed: </h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    className="input"
                    maxLength="500"
                    type="text"
                    placeholder="Closed"
                    value={closed}
                    onChange={(event) => setClosed(event.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="plan-duration plan-detail">
            <h3>Duration: </h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    className="input"
                    type="text"
                    placeholder="Duration"
                    value={duration}
                    onChange={(event) => setDuration(event.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="plan-price plan-detail">
            <h3>Price: </h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    className="input price"
                    type="number"
                    min={0}
                    placeholder="Adult's price"
                    value={priceAdult}
                    onChange={(event) => setPriceAdult(event.target.value)}
                  />
                  <select
                    className="input date"
                    required={priceAdult ? "required" : ""}
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
                    min={0}
                    placeholder="Children's price"
                    value={priceChildren}
                    onChange={(event) => setPriceChildren(event.target.value)}
                  />
                  <select
                    className="input date"
                    required={priceChildren ? "required" : ""}
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

          <div className="plan-discount plan-detail">
            <h3>Discount: </h3>
            <div>
              <label>
                <div className="form-data">
                  <input
                    className="input"
                    type="text"
                    placeholder="Discount"
                    value={discount}
                    onChange={(event) => setDiscount(event.target.value)}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="plan-web plan-detail">
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

          <div className="plan-phone plan-detail">
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

          <div className="plan-email plan-detail">
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

          <div className="plan-notation plan-detail">
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
            value="Update Plan"
          />
        </form>
      </div>
    </div>
  );
}

export default EditPlanCard;