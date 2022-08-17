import React from "react";
import "./TransportationCard.css";
import * as api from "../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function TransportationCard({ transportation }) {
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
        <div>{transportation.priceWithCurrency}</div>
      </div>
      <div className="transportation-location transportation-info">
        <h3>Origin - Destination:</h3>
        <div>{transportation.origin + " / " + transportation.destination}</div>
      </div>
      <div className="transportation-dates transportation-info">
        <h3>Departure - Arrival:</h3>
        {transportation !== "" ? (
          <div>
            {transportation.departure.substring(
              0,
              transportation.departure.length - 14
            ) +
              "   " +
              transportation.departure.substring(
                11,
                transportation.departure.length - 8
              ) +
              "h / " +
              transportation.arrival.substring(
                0,
                transportation.arrival.length - 14
              ) +
              "   " +
              transportation.arrival.substring(
                11,
                transportation.arrival.length - 8
              )+
              "h" }
          </div>
        ) : (
          <p></p>
        )}
      </div>
      <div className="transportation-web transportation-info">
        <h3>Web page: </h3>
        <div>
          {transportation !== "" ? (
            !transportation.web.startsWith("https://") &&
            !transportation.web.startsWith("http://") &&
            transportation.web !== null ? (
              <a href={"https://" + transportation.web} target="_blank">
                {"https://" + transportation.web}
              </a>
            ) : (
              <a href={transportation.web} target="_blank">
                {transportation.web}
              </a>
            )
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <div className="transportation-notation transportation-info">
        <h3>Notation: </h3>
        <div>{transportation.notation}</div>
      </div>
    </div>
  );
}

export default TransportationCard;
