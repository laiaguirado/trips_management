import React from "react";
import "./TransportationCard.css";
import * as helper from "../../../helper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

function TransportationCard({ transportation, rating }) {
  document.body.style.overflow = "unset";
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
      let { date, hour } = helper.localDateTime(transportation.departure);
      return date + " " + hour + "h - /";
    }

    if (transportation.departure === null || transportation.departure === "") {
      let { date, hour } = helper.localDateTime(transportation.arrival);
      return "/ - " + date + " " + hour + "h";
    }

    let { date: dateDeparture, hour: hourDeparture } = helper.localDateTime(
      transportation.departure
    );
    let { date: dateArrival, hour: hourArrival } = helper.localDateTime(
      transportation.arrival
    );
    return (
      dateDeparture +
      " " +
      hourDeparture +
      "h - " +
      dateArrival +
      " " +
      hourArrival +
      "h"
    );
  }

  return (
    <div className="transportation-card">
      <h1 className="details-title">TRANSPORTATION</h1>
      <div className="rating">
        {rating === null ? (
          <FontAwesomeIcon icon={faStarRegular} className="icon" />
        ) : (
          <FontAwesomeIcon icon={faStar} className="icon" />
        )}
        {rating < 2 ? (
          <FontAwesomeIcon icon={faStarRegular} className="icon" />
        ) : (
          <FontAwesomeIcon icon={faStar} className="icon" />
        )}
        {rating < 3 ? (
          <FontAwesomeIcon icon={faStarRegular} className="icon" />
        ) : (
          <FontAwesomeIcon icon={faStar} className="icon" />
        )}
        {rating < 4 ? (
          <FontAwesomeIcon icon={faStarRegular} className="icon" />
        ) : (
          <FontAwesomeIcon icon={faStar} className="icon" />
        )}
        {rating < 5 ? (
          <FontAwesomeIcon icon={faStarRegular} className="icon" />
        ) : (
          <FontAwesomeIcon icon={faStar} className="icon" />
        )}
      </div>
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
            <h3>Notes: </h3>
            <div className="notation-text">{transportation.notation}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransportationCard;
