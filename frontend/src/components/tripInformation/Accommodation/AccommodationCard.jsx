import React from "react";
import "./AccommodationCard.css";

function AccommodationCard({ accommodation }) {
  console.log(accommodation);
  return (
    <div className="accommodation-card">
      <h1>Accommodation card</h1>
      <h3>Web page: {accommodation.web}</h3>
      <h3>Description: {accommodation.description}</h3>
      <h3>Location: {accommodation.location}</h3>
      <h3>
        Dates:
        {accommodation.startDate.substring(
          0,
          accommodation.startDate.length - 14
        ) +
          " / " +
          accommodation.endDate.substring(
            0,
            accommodation.startDate.length - 14
          )}
      </h3>
      <h3>Phone number: {accommodation.phone}</h3>
      <h3>Email: {accommodation.email}</h3>
    </div>
  );
}

export default AccommodationCard;
