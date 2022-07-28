import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TripDetailsPage.css";
import Bar from "../components/Bar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faBed,
  faPlane,
  faCamera,
  faUtensils,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

function TripDetailsPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  //aqui haremos la llamada a la API para obtener la info del trip con Id correspondiente
  const trip = {
    id: 123,
    tripName: "London",
    dates: "19/07/2022 - 29/07/2022",
    members: ["Laia", "Natalia", "Alba", "Victor"],
  };

  return (
    <div className="trip-details-page">
      <Bar mode="login" />
      <div>
        <div
          className="return-icon"
          onClick={() => navigate(`/`, { replace: false })}
        >
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <h3>TripDetailsPage</h3>
        <h1> {trip.tripName}</h1>
        <h3>Dates: {trip.dates}</h3>
        <h3>Members:</h3>
        <div>
          {trip.members.map((member) => (
            <p key={member}>{member}</p>
          ))}
        </div>
        <div
          className="details-info"
          onClick={() =>
            navigate(`/trip/${tripId}/accomodation`, { replace: false })
          }
        >
          <FontAwesomeIcon className="icon" icon={faBed} size="2x" />{" "}
          Accomodation
        </div>
        <div
          className="details-info"
          onClick={() =>
            navigate(`/trip/${tripId}/transportation`, { replace: false })
          }
        >
          <FontAwesomeIcon className="icon" icon={faPlane} size="2x" />
          Transportation
        </div>
        <div
          className="details-info"
          onClick={() =>
            navigate(`/trip/${tripId}/thingsToDo`, { replace: false })
          }
        >
          <FontAwesomeIcon className="icon" icon={faCamera} size="2x" />
          Things To Do
        </div>
        <div
          className="details-info"
          onClick={() =>
            navigate(`/trip/${tripId}/placesToEat`, { replace: false })
          }
        >
          <FontAwesomeIcon className="icon" icon={faUtensils} size="2x" />
          Places To Eat
        </div>
        <div className="delete-trip">
          <FontAwesomeIcon icon={faTrashCan} /> DELETE TRIP
        </div>
      </div>
    </div>
  );
}

export default TripDetailsPage;
