import React from "react";
import "./TripCard.css";

function TripCard({ trip, onClick }) {
  return (
    <div className="trip-card" onClick={onClick}>
      <h3>{trip.name}</h3>
      <h4>{trip.location}</h4>
      {trip.image !== undefined ? (
        <img
          src={"../../../src/assets/upload" + trip.image.name}
          alt="trip-image"
        />
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default TripCard;
