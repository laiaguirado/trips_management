import React from "react";
import "./TransportCard.css";
import * as helper from "../../../helper";
import ScoreDetailsCard from "../../score/ScoreDetailsCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruckPlane,
  faGlobe,
  faPlane,
  faShip,
  faCar,
  faTrainSubway,
  faTram,
  faBus,
  faTrain,
} from "@fortawesome/free-solid-svg-icons";

function TransportCard({ transport }) {
  document.body.style.overflow = "unset";

  function getDepartureArrival(time) {
    let { date, hour } = helper.localDateTime(time);
    return date + " " + hour + "h";
  }

  function getTransportTypeIcon() {
    switch (transport.type) {
      case "airplane":
        return <FontAwesomeIcon className="icon" icon={faPlane} size="2x" />;
      case "ship":
        return <FontAwesomeIcon className="icon" icon={faShip} size="2x" />;
      case "car":
        return <FontAwesomeIcon className="icon" icon={faCar} size="2x" />;
      case "subway":
        return (
          <FontAwesomeIcon className="icon" icon={faTrainSubway} size="2x" />
        );
      case "tram":
        return <FontAwesomeIcon className="icon" icon={faTram} size="2x" />;
      case "bus":
        return <FontAwesomeIcon className="icon" icon={faBus} size="2x" />;
      case "train":
        return <FontAwesomeIcon className="icon" icon={faTrain} size="2x" />;
      default:
        return (
          <FontAwesomeIcon className="icon" icon={faTruckPlane} size="2x" />
        );
    }
  }

  return (
    <div className="transport-card">
      <h1 className="details-title">{transport.name}</h1>
      {transport.totalScore && (
        <ScoreDetailsCard totalScore={transport.totalScore} />
      )}
      <div className="details-dates">
        <div className="details-date-info">
          {transport.origin ||
          transport.departure ||
          transport.arrival ||
          transport.destination ? (
            <h3>Departure </h3>
          ) : (
            <h3></h3>
          )}
          {transport.origin && <div>{transport.origin}</div>}
          {transport.departure && (
            <div>{getDepartureArrival(transport.departure)}</div>
          )}
        </div>
        <div className="details-date-info">
          {transport.origin ||
          transport.departure ||
          transport.arrival ||
          transport.destination ? (
            <h3>Arrival </h3>
          ) : (
            <h3></h3>
          )}
          {transport.destination && <div>{transport.destination}</div>}
          {transport.arrival && (
            <div>{getDepartureArrival(transport.arrival)}</div>
          )}
        </div>
      </div>
      <div className="details-icon">
        <div className="dot"></div>
        <div className="dotted-line"></div>
        {getTransportTypeIcon()}
        <div className="dotted-line"></div>
        <div className="dot"></div>
      </div>

      <div className="details-flex">
        <div className="transport-info">
          <div className="transport-type transport-detail">
            <h3>Type: </h3>
            <div>{transport.type}</div>
          </div>
          {transport.typeDetails && (
            <div className="transport-typeDetails transport-detail">
              <h3>Type Details: </h3>
              <div>{transport.typeDetails}</div>
            </div>
          )}
          {transport.priceWithCurrency && (
            <div className="transport-price transport-detail">
              <h3>Price: </h3>
              <div>
                {transport.priceWithCurrency !== ""
                  ? transport.priceWithCurrency
                  : ""}
              </div>
            </div>
          )}
          {transport.notation && (
            <div className="transport-notation transport-detail">
              <h3>Notes: </h3>
              <div className="notation-text">{transport.notation}</div>
            </div>
          )}
        </div>

        <img
          className="details-illustration"
          src={"../../../src/assets/illustrations/transport.svg"}
        ></img>
      </div>

      {(transport.web || transport.phone || transport.email) && (
        <div className="transport-contact">
          {transport.web && (
            <div>
              {transport !== "" ? (
                !transport.web.startsWith("https://") &&
                !transport.web.startsWith("http://") &&
                transport.web !== null &&
                transport.web !== "" ? (
                  <a href={"https://" + transport.web} target="_blank">
                    <FontAwesomeIcon icon={faGlobe} className="icon" />
                    <div>Web:</div>
                    <div className="link">{transport.web}</div>
                  </a>
                ) : (
                  <a href={transport.web} target="_blank">
                    <FontAwesomeIcon icon={faGlobe} className="icon" />
                    <div>Web:</div>
                    <div className="link">{transport.web}</div>
                  </a>
                )
              ) : (
                <p></p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TransportCard;
