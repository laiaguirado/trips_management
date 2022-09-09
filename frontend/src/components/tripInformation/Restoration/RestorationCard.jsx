import React from "react";
import "./RestorationCard.css";
import ScoreDetailsCard from "../../score/ScoreDetailsCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faGlobe,
  faPhone,
  faEnvelope,
  faStarHalfStroke,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

function RestorationCard({ restoration }) {
  document.body.style.overflow = "unset";
  function getHours() {
    const openingHour =
      restoration.openingHour === null || restoration.openingHour === ""
        ? "-"
        : restoration.openingHour + "h";

    const closingHour =
      restoration.closingHour === null || restoration.closingHour === ""
        ? "-"
        : restoration.closingHour + "h";

    return openingHour + " / " + closingHour;
  }

  function getPrices() {
    const minPriceWithCurrency =
      restoration.minPriceWithCurrency === null ||
      restoration.minPriceWithCurrency === ""
        ? "-"
        : restoration.minPriceWithCurrency;

    const maxPriceWithCurrency =
      restoration.maxPriceWithCurrency === null ||
      restoration.maxPriceWithCurrency === ""
        ? "-"
        : restoration.maxPriceWithCurrency;

    return minPriceWithCurrency + " / " + maxPriceWithCurrency;
  }

  return (
    <div className="restoration-card">
      <h1 className="details-title">{restoration.name}</h1>
      {restoration.totalScore && (
        <ScoreDetailsCard totalScore={restoration.totalScore} />
      )}
      <div className="details-icon">
        <div className="dot"></div>
        <div className="dotted-line"></div>
        <FontAwesomeIcon className="icon" icon={faUtensils} size="2x" />
        <div className="dotted-line"></div>
        <div className="dot"></div>
      </div>

      <div className="details-flex">
        <div className="restoration-info">
          <div className="restoration-location restoration-detail">
            <h3>Location: </h3>
            <div>{restoration.location}</div>
          </div>
          {restoration.kindOfFood && (
            <div className="restoration-kindOfFood restoration-detail">
              <h3>Kind of Food: </h3>
              <div>{restoration.kindOfFood}</div>
            </div>
          )}
          {(restoration.minPriceWithCurrency ||
            restoration.maxPriceWithCurrency) && (
            <div className="restoration-price restoration-detail">
              <h3>Price (min - max):</h3>
              <div>{getPrices()}</div>
            </div>
          )}
          {(restoration.openingHour || restoration.closingHour) && (
            <div className="restoration-hours restoration-detail">
              <h3>Opening hour - Closing Hour:</h3>
              <div>{getHours()}</div>
            </div>
          )}
          {restoration.closed && (
            <div className="restoration-closed restoration-detail">
              <h3>Closed: </h3>
              <div>{restoration.closed}</div>
            </div>
          )}
          {restoration.speciality && (
            <div className="restoration-speciality restoration-detail">
              <h3>Speciality of the restaurant: </h3>
              <div>{restoration.speciality}</div>
            </div>
          )}
          {restoration.takeAway !== null && (
            <div className="restoration-takeAway restoration-detail">
              <h3>Take Away: </h3>
              <div>
                {restoration.takeAway !== null &&
                restoration.takeAway !== undefined
                  ? restoration.takeAway === true
                    ? "Yes"
                    : "No"
                  : ""}
              </div>
            </div>
          )}
          {restoration.reserved !== null && (
            <div className="restoration-reserved restoration-detail">
              <h3>Reservation required: </h3>
              <div>
                {restoration.reserved !== null &&
                restoration.reserved !== undefined
                  ? restoration.reserved === true
                    ? "Yes"
                    : "No"
                  : ""}
              </div>
            </div>
          )}
          {restoration.notation && (
            <div className="restoration-notation restoration-detail">
              <h3>Notes: </h3>
              <div className="notation-text">{restoration.notation}</div>
            </div>
          )}
        </div>

        <img
          className="details-illustration"
          src={"../../../src/assets/illustrations/restoration.svg"}
        ></img>
      </div>

      {(restoration.web || restoration.phone || restoration.email) && (
        <div className="restoration-contact">
          {restoration.web && (
            <div>
              {restoration !== "" ? (
                !restoration.web.startsWith("https://") &&
                !restoration.web.startsWith("http://") &&
                restoration.web !== null &&
                restoration.web !== "" ? (
                  <a href={"https://" + restoration.web} target="_blank">
                    <FontAwesomeIcon icon={faGlobe} className="icon" />
                    <div>Web:</div>
                    <div className="link">{restoration.web}</div>
                  </a>
                ) : (
                  <a href={restoration.web} target="_blank">
                    <FontAwesomeIcon icon={faGlobe} className="icon" />
                    <div>Web:</div>
                    <div className="link">{restoration.web}</div>
                  </a>
                )
              ) : (
                <p></p>
              )}
            </div>
          )}
          {restoration.phone && (
            <div>
              <a href={"tel:" + restoration.phone}>
                <FontAwesomeIcon icon={faPhone} className="icon" />
                <div>Phone:</div>
                <div className="link">{restoration.phone}</div>
              </a>
            </div>
          )}
          {restoration.email && (
            <div>
              <a href={"mailto:" + restoration.email}>
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <div>Email:</div>
                <div className="link">{restoration.email}</div>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RestorationCard;
