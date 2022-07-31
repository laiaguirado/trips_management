import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TripDetailsPage.css";
import * as api from "../api";
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
  const [trip, setTrip] = useState([]);
  const { tripId } = useParams();
  const navigate = useNavigate();

  const getTripData = async () => {
    const { success, trip, error } = await api.getTrip(tripId);
    setTrip(trip);
  };
  console.log(trip);

  /*aqui haremos la llamada a la API para obtener la info del trip con Id correspondiente
  const trip = {
    _id: "62e6a3029323d86856ba3ecd",
    name: "Trip 1.0",
    description: "This is our first trip to London",
    location: "London",
    startDate: "2022-08-01T00:00:00.000Z",
    endDate: "2022-08-15T00:00:00.000Z",
    creator: {
      email: "trip@gmail.com",
    },
    travellers: [
      {
        _id: "62defb1693e76d3cd1d60da5",
        email: "trip@gmail.com",
        username: "Trip",
      },
      {
        _id: "62df0cf82ab1aecb8aaa2ea0",
        email: "pipi@gmail.cat",
        username: "Rogerpuey",
      },
    ],
  };*/

  useEffect(() => {
    getTripData();
  }, [tripId]);

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
        <h1> {trip.name}</h1>
        <h3>
          Dates: {trip.startDate} - {trip.endDate}
        </h3>
        <h3>Members:</h3>
        <div>
          {Array.isArray(trip) !== true ? (
            trip.travellers.map((member) => (
              <p key={member._id}>{member.username}</p>
            ))
          ) : (
            <p></p>
          )}
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
