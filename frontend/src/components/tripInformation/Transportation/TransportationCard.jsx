import React from "react";
import "./TransportationCard.css";
import * as helper from "../../../helper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTruckPlane } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

function TransportationCard({ transportation, rating }) {
  document.body.style.overflow = "unset";

  function getDepartureArrival(time) {
    let { date, hour } = helper.localDateTime(time);
    return date + " " + hour + "h";
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

      <div className="details-dates">
        <div className="details-date-info">
          <h3>Departure: </h3>
          {transportation.origin && <div>{transportation.origin}</div>}
          {transportation.departure && (
            <div>{getDepartureArrival(transportation.departure)}</div>
          )}
        </div>
        <div className="details-date-info">
          <h3>Arrival: </h3>
          {transportation.destination && (
            <div>{transportation.destination}</div>
          )}
          {transportation.arrival && (
            <div>{getDepartureArrival(transportation.arrival)}</div>
          )}
        </div>
      </div>
      <div className="details-icon">
        <div className="dot"></div>
        <div className="dotted-line"></div>
        <FontAwesomeIcon className="icon" icon={faTruckPlane} size="2x" />
        <div className="dotted-line"></div>
        <div className="dot"></div>
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
