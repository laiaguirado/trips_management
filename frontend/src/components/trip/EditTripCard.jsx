import React, { useState, useRef } from "react";
import "./EditTripCard.css";

function EditTripCard({ trip, tripId, onEdit }) {
  const [tripName, setTripName] = useState(trip.name);
  const [tripLocation, setTripLocation] = useState(trip.location);
  const [tripStartDate, setTripStartDate] = useState(
    setDateValue(trip.startDate)
  );
  const [tripEndDate, setTripEndDate] = useState(setDateValue(trip.endDate));
  const [tripDescription, setTripDescription] = useState(trip.description);
  const [imageFile, setImageFile] = useState(null);
  const [tripImage, setTripImage] = useState(
    trip.image.name ? "http://localhost:8080/upload/" + trip.image.name : null
  );
  const [imageUrl, setImageUrl] = useState(trip.image.url);

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
    if (imageFile != null) {
      formData.append("fileImage", imageFile);
    }
    if (imageUrl != null) {
      formData.append("image", imageUrl);
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
        {tripImage && imageUrl === "" ? (
          <img className="trip-image image-editing" src={tripImage}></img>
        ) : (
          <img className="trip-image image-editing" src={imageUrl}></img>
        )}
        <label>
          <input
            className="input upload"
            required={imageUrl ? false : true}
            disabled={imageUrl ? true : false}
            placeholder="Select a file"
            type="file"
            onInput={(event) => {
              setTripImage(URL.createObjectURL(event.target.files[0]));
              setImageFile(event.target.files[0]);
            }}
          />
          <div> Or</div>
          <input
            className="input imageUrl"
            required={imageFile ? false : true}
            disabled={imageFile ? true : false}
            placeholder="Copy an image url"
            type="url"
            onInput={(event) => {
              setImageUrl(event.target.value);
            }}
          />
        </label>
      </div>
    </div>
  );
}

export default EditTripCard;
