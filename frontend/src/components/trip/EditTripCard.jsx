import React, { useState, useEffect, useRef } from "react";
import "./EditTripCard.css";

function EditTripCard({ trip, tripId, onEdit }) {
  const [tripName, setTripName] = useState(trip.name);
  const [tripLocation, setTripLocation] = useState(trip.location);
  const [tripStartDate, setTripStartDate] = useState(
    setDateValue(trip.startDate)
  );
  const [tripEndDate, setTripEndDate] = useState(setDateValue(trip.endDate));
  const [tripDescription, setTripDescription] = useState(trip.description);
  const [tripImage, setTripImage] = useState(null);
  const [image, setImage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const refImage = useRef(null);
  const [imageSrc, setImageSrc] = useState("");
  /*function getDateValue(value, placeholder, order) {
    if (value === "" || value === undefined || value === null) {
      return placeholder;
    }
    const date = new Date(value);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = ("0" + date.getFullYear()).slice(-4);
    if (order) {
      return day + "-" + month + "-" + year;
    } else {
      return year + "-" + month + "-" + day;
    }
  }

  function setDateValue(value) {
    if (value === "" || value === undefined || value === null) {
      return "";
    }
    const date = new Date(value);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = ("0" + date.getFullYear()).slice(-4);
    return year + "-" + month + "-" + day;
  }*/

  function setDateValue(value) {
    if (value === "" || value === undefined || value === null) {
      return "";
    }
    return value.substring(0, 10);
  }

  const update = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", tripName);
    formData.append("description", tripDescription);
    formData.append("location", tripLocation);
    if (tripImage != null) {
      formData.append("fileImage", tripImage);
    }
    formData.append("startDate", tripStartDate);
    formData.append("endDate", tripEndDate);

    onEdit(tripId, formData);
  };

  function readURL(image) {
    const input = image.target;
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  function setImageUpload() {
    if (imageSrc === "" || imageSrc === null) {
      if (trip.image.name.startsWith("/")) {
        return "http://localhost:8080/upload" + trip.image.name;
      } else {
        return "";
      }
    } else {
      return imageSrc;
    }
  }

  return (
    <div className="trip">
      <div className="edit-card">
        <div className="trip-info">
          <form className="add-form" onSubmit={(e) => update(e)}>
            <div className="trip-name">
              <label>
                <input
                  className="input edit-trip-name"
                  required
                  type="text"
                  placeholder="Trip Name *"
                  defaultValue={trip.name}
                  onChange={(event) => setTripName(event.target.value)}
                />
              </label>
            </div>
            <div className="trip-location trip-detail">
              <h3>Location: </h3>
              <label>
                <div className="form-data">
                  <input
                    className="input"
                    required
                    type="text"
                    placeholder="Location *"
                    defaultValue={trip.location}
                    onChange={(event) => setTripLocation(event.target.value)}
                  />
                </div>
              </label>
            </div>
            <div className="trip-dates trip-detail">
              <h3>Dates:</h3>
              <div>
                <label>
                  <div className="form-data">
                    <input
                      id="date"
                      className="input date"
                      required
                      type="date"
                      placeholder="Start Date *"
                      max={tripEndDate}
                      defaultValue={tripStartDate}
                      onFocus={(event) => {
                        event.target.value = tripStartDate;
                      }}
                      onBlur={(event) => {
                        event.target.value = tripStartDate;
                      }}
                      onChange={(event) => setTripStartDate(event.target.value)}
                    />
                  </div>
                </label>
                <label>
                  <div className="form-data">
                    <input
                      id="date"
                      className="input date"
                      required
                      type="date"
                      placeholder="End Date *"
                      min={tripStartDate}
                      defaultValue={tripEndDate}
                      onFocus={(event) => {
                        event.target.value = tripEndDate;
                      }}
                      onBlur={(event) => {
                        event.target.value = tripEndDate;
                      }}
                      onChange={(event) => setTripEndDate(event.target.value)}
                    />
                  </div>
                </label>
              </div>
            </div>
            <div className="trip-description trip-detail">
              <h3>Description:</h3>
              <div className="notation-text">
                <label>
                  <div className="form-data">
                    <textarea
                      className="input description"
                      rows="5"
                      cols="30"
                      placeholder="Description"
                      defaultValue={trip.description}
                      onChange={(event) =>
                        setTripDescription(event.target.value)
                      }
                    ></textarea>
                  </div>
                </label>
              </div>
            </div>
            <input
              className="submit-button form-data"
              type="submit"
              value="Update Trip"
            />
          </form>
        </div>
      </div>
      <div className="uploading-new-image">
        <img className="trip-image image-editing" src={setImageUpload()}></img>
        <label>
          <div className="form-data">
            <input
              className="input upload"
              required
              type="file"
              ref={refImage}
              onInput={(event) => {
                setTripImage(event.target.files[0]);
              }}
              onChange={(e) => readURL(e)}
            />
          </div>
        </label>
      </div>
    </div>
  );
}

export default EditTripCard;
