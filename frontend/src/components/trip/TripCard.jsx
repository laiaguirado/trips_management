import React from "react";
import "./TripCard.css";

function TripCard({ trip, onClick }) {
  return (
    <div className="trip-card" onClick={onClick}>
      <div className="gradient">
        {trip.image !== undefined ? (
          <img
            className="image"
            src={"http://localhost:8080/upload" + trip.image.name}
            alt="trip-image"
          />
        ) : (
          <p></p>
        )}
      </div>
      <h3 className="title">{trip.name}</h3>
    </div>
  );
}

export default TripCard;
