import React from "react";
import "./AccomodationCard.css";

function AccomodationCard({ accomodation }) {
  return (
    <div className="accomodation-card">
      <h1>Accomodation card</h1>
      <h3>Web page: {accomodation.web}</h3>
      <h3>Location: {accomodation.location}</h3>
      <h3>
        Dates:
        {accomodation.startDate.substring(
          0,
          accomodation.startDate.length - 0
        ) +
          " / " +
          accomodation.endDate.substring(0, accomodation.startDate.length - 0)}
      </h3>
      <h3>Phone number: {accomodation.phone}</h3>
      <h3>Email: {accomodation.email}</h3>
    </div>
  );
}

export default AccomodationCard;
