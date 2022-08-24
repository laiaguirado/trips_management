import React from "react";
import "./TransportationCard.css";
import * as api from "../../../api";
import * as helper from "../../../helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function TransportationCard({ transportation }) {
  function getOriginDestination() {
    const origin =
      transportation.origin === null || transportation.origin === ""
        ? "-"
        : transportation.origin;

    const destination =
      transportation.destination === null || transportation.destination === ""
        ? "-"
        : transportation.destination;

    return origin + " / " + destination;
  }

  function getDepartureArrival() {
    if (transportation.arrival === null || transportation.arrival === "") {
      return (
        transportation.departure.substring(
          11,
          transportation.departure.length - 8
        ) +
        "h " +
        helper.changeDateOrder(
          transportation.departure.substring(
            0,
            transportation.departure.length - 14
          )
        ) +
        " / -"
      );
    }

    if (transportation.departure === null || transportation.departure === "") {
      return (
        "- / " +
        transportation.arrival.substring(
          11,
          transportation.arrival.length - 8
        ) +
        "h " +
        helper.changeDateOrder(
          transportation.arrival.substring(
            0,
            transportation.arrival.length - 14
          )
        )
      );
    }

    return (
      transportation.departure.substring(
        11,
        transportation.departure.length - 8
      ) +
      "h " +
      helper.changeDateOrder(
        transportation.departure.substring(
          0,
          transportation.departure.length - 14
        )
      ) +
      " / " +
      transportation.arrival.substring(11, transportation.arrival.length - 8) +
      "h " +
      helper.changeDateOrder(
        transportation.arrival.substring(0, transportation.arrival.length - 14)
      )
    );
  }

  return (
    <div className="transportation-card">
      <h1 className="details-title">TRANSPORTATION</h1>
      <div className="transportation-info">
        <div className="transportation-name transportation-detail">
          <h3>Name: </h3>
          <div>{transportation.name}</div>
        </div>
        <div className="transportation-type transportation-detail">
          <h3>Type: </h3>
          <div>{transportation.type}</div>
        </div>
        {transportation.typeDetails && (
          <div className="transportation-typeDetails transportation-detail">
            <h3>Type Details: </h3>
            <div>{transportation.typeDetails}</div>
          </div>
        )}
        {transportation.priceWithCurrency && (
          <div className="transportation-price transportation-detail">
            <h3>Price: </h3>
            <div>
              {transportation.priceWithCurrency !== ""
                ? transportation.priceWithCurrency
                : ""}
            </div>
          </div>
        )}
        {(transportation.origin || transportation.destination) && (
          <div className="transportation-location transportation-detail">
            <h3>Origin - Destination:</h3>
            <div>{getOriginDestination()}</div>
          </div>
        )}
        {(transportation.departure || transportation.arrival) && (
          <div className="transportation-dates transportation-detail">
            <h3>Departure - Arrival:</h3>
            {getDepartureArrival()}
          </div>
        )}
        {transportation.web && (
          <div className="transportation-web transportation-detail">
            <h3>Web page: </h3>
            <div>
              {transportation !== "" ? (
                !transportation.web.startsWith("https://") &&
                !transportation.web.startsWith("http://") &&
                transportation.web !== null &&
                transportation.web !== "" ? (
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
        )}
        {transportation.notation && (
          <div className="transportation-notation transportation-detail">
            <h3>Notation: </h3>
            <div className="notation-text">{transportation.notation}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransportationCard;
