import React, { useState, useEffect } from "react";
import "./AddTripCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCartFlatbedSuitcase,
  faImage,
  faCalendar,
  faAngleLeft,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";

function AddTripCard({ onAdd, message, adding }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const add = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("fileImage", image);
    formData.append("image", imageUrl);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);

    onAdd(formData);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function getDateValue(value, placeholder) {
    if (value === "" || value === undefined) {
      return placeholder;
    }
    const date = new Date(value.replace(/-/g, "/"));
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = ("0" + date.getFullYear()).slice(-4);
    return day + "/" + month + "/" + year;
  }

  return (
    <div className="add-card add-trip-card">
      <div className="background" onClick={adding}></div>
      <div className="form-container">
        <div className="return-icon" onClick={adding}>
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <form className="add-form" onSubmit={(e) => add(e)}>
          <h1 className="title">New Trip</h1>
          <div className="error">{message}</div>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faCartFlatbedSuitcase} className="icon" />
              <input
                className="input"
                required
                type="text"
                placeholder="Trip Name *"
                value={name}
                onChange={(event) => setName(event.target.value)}
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
                placeholder="Location *"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faCalendar} className="icon" />
              <input
                id="date"
                className="input date"
                required
                type="text"
                placeholder="Start Date *"
                max={endDate}
                onFocus={(event) => {
                  event.target.type = "date";
                  event.target.value = startDate;
                }}
                onBlur={(event) => {
                  event.target.type = "text";
                  event.target.value = getDateValue(startDate, "Start Date *");
                }}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faCalendar} className="icon" />
              <input
                id="date"
                className="input date"
                required
                type="text"
                placeholder="End Date *"
                min={startDate}
                onFocus={(event) => {
                  event.target.type = "date";
                  event.target.value = endDate;
                }}
                onBlur={(event) => {
                  event.target.type = "text";
                  event.target.value = getDateValue(endDate, "End Date *");
                }}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>
          </label>
          <label>
            <div className="form-data ">
              <div className="add-image">
                <div>
                  <FontAwesomeIcon icon={faImage} className="icon" />
                  <input
                    className="input upload"
                    required={imageUrl ? false : true}
                    disabled={imageUrl ? true : false}
                    placeholder="Select a file"
                    type="file"
                    onInput={(event) => {
                      setImage(event.target.files[0]);
                    }}
                  />
                </div>

                <div> Or</div>

                <input
                  className="input imageUrl"
                  required={image ? false : true}
                  disabled={image ? true : false}
                  placeholder="Copy an image url"
                  type="url"
                  onInput={(event) => {
                    setImageUrl(event.target.value);
                  }}
                />
              </div>
            </div>
          </label>
          <label>
            <div className="form-data">
              <FontAwesomeIcon icon={faNoteSticky} className="icon" />
              <textarea
                className="input description"
                rows="5"
                cols="30"
                placeholder="Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </div>
          </label>
          <input
            className="submit-button form-data"
            type="submit"
            value="Create New Trip"
          />
        </form>
      </div>
    </div>
  );
}

export default AddTripCard;
