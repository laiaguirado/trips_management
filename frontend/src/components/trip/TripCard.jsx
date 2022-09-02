import React from "react";
import "./TripCard.css";

function TripCard({ trip, onClick }) {
  return (
    <div className="trip-card" onClick={onClick}>
      <div className="gradient">
        {trip.image.name ? (
          <img
            className="image"
            src={"http://localhost:8080/upload" + trip.image.name}
          ></img>
        ) : (
          <img className="image" src={trip.image.url}></img>
        )}
      </div>
      <h3 className="title">{trip.name}</h3>
    </div>
  );
}

export default TripCard;
