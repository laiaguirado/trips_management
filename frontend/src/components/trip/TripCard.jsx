import React from "react";
import "./TripCard.css";

function TripCard({ trip, onClick }) {
  return (
    <div className="trip-card" onClick={onClick}>
      <h3>{trip.name}</h3>
      <h4>{trip.location}</h4>
      <img src={trip.image} alt="trip-image" />
    </div>
  );
}

export default TripCard;
