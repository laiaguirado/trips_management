import React from "react";
import "./TransportationCard.css";
import * as api from "../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function TransportationCard({ transportation, modifyTransportationList }) {
  if (
    !transportation.web.startsWith("https://") &&
    !transportation.web.startsWith("http://")
  ) {
    transportation.web = "https://" + transportation.web;
  }

  const deleteTransportation = async (transportationId) => {
    const { success, error } = await api.deleteTransportation(transportationId);
    if (success) {
      modifyTransportationList((prevList) =>
        prevList.filter((t) => t._id !== transportationId)
      );
    } else {
      setMessage(error);
    }
  };

  return (
    <div className="transportation-card">
      <h1>Transportation card</h1>
      <div className="transportation-name transportation-info">
        <h3>Name: </h3>
        <div>{transportation.name}</div>
      </div>
      <div className="transportation-type transportation-info">
        <h3>Type: </h3>
        <div>{transportation.type}</div>
      </div>
      <div className="transportation-typeDetails transportation-info">
        <h3>Type Details: </h3>
        <div>{transportation.typeDetails}</div>
      </div>
      <div className="transportation-price transportation-info">
        <h3>Price: </h3>
        <div>{transportation.price}</div>
      </div>
      <div className="transportation-location transportation-info">
        <h3>Origin - Destination:</h3>
        <div>{transportation.origin + " / " + transportation.destination}</div>
      </div>
      <div className="transportation-dates transportation-info">
        <h3>Departure - Arrival:</h3>
        <div>
          {transportation.departure.substring(
            0,
            transportation.departure.length - 0
          ) +
            " / " +
            transportation.arrival.substring(
              0,
              transportation.arrival.length - 0
            )}
        </div>
      </div>
      <div className="transportation-web transportation-info">
        <h3>Web page: </h3>
        <div>
          <a href={transportation.web} target="_blank">
            {transportation.web}
          </a>
        </div>
      </div>
      <div className="transportation-notation transportation-info">
        <h3>Notation: </h3>
        <div>{transportation.notation}</div>
      </div>
      <div
        className="delete-transportation"
        onClick={() => {
          deleteTransportation(transportation._id);
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} /> DELETE TRANSPORTATION
      </div>
    </div>
  );
}

export default TransportationCard;
