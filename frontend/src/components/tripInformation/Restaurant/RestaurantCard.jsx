import React from "react";
import "./RestaurantCard.css";
import ScoreDetailsCard from "../../score/ScoreDetailsCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faPhone,
  faEnvelope,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

function RestaurantCard({ restaurant }) {
  document.body.style.overflow = "unset";
  function getHours() {
    const openingHour =
      restaurant.openingHour === null || restaurant.openingHour === ""
        ? "-"
        : restaurant.openingHour + "h";

    const closingHour =
      restaurant.closingHour === null || restaurant.closingHour === ""
        ? "-"
        : restaurant.closingHour + "h";

    return openingHour + " / " + closingHour;
  }

  function getPrices() {
    const minPriceWithCurrency =
      restaurant.minPriceWithCurrency === null ||
      restaurant.minPriceWithCurrency === ""
        ? "-"
        : restaurant.minPriceWithCurrency;

    const maxPriceWithCurrency =
      restaurant.maxPriceWithCurrency === null ||
      restaurant.maxPriceWithCurrency === ""
        ? "-"
        : restaurant.maxPriceWithCurrency;

    return minPriceWithCurrency + " / " + maxPriceWithCurrency;
  }

  return (
    <div className="restaurant-card">
      <h1 className="details-title">{restaurant.name}</h1>
      {restaurant.totalScore && (
        <ScoreDetailsCard totalScore={restaurant.totalScore} />
      )}
      <div className="details-icon">
        <div className="dot"></div>
        <div className="dotted-line"></div>
        <FontAwesomeIcon className="icon" icon={faUtensils} size="2x" />
        <div className="dotted-line"></div>
        <div className="dot"></div>
      </div>

      <div className="details-flex">
        <div className="restaurant-info">
          <div className="restaurant-location restaurant-detail">
            <h3>Location: </h3>
            <div>{restaurant.location}</div>
          </div>
          {restaurant.kindOfFood && (
            <div className="restaurant-kindOfFood restaurant-detail">
              <h3>Kind of Food: </h3>
              <div>{restaurant.kindOfFood}</div>
            </div>
          )}
          {(restaurant.minPriceWithCurrency ||
            restaurant.maxPriceWithCurrency) && (
            <div className="restaurant-price restaurant-detail">
              <h3>Price (min - max):</h3>
              <div>{getPrices()}</div>
            </div>
          )}
          {(restaurant.openingHour || restaurant.closingHour) && (
            <div className="restaurant-hours restaurant-detail">
              <h3>Opening hour - Closing Hour:</h3>
              <div>{getHours()}</div>
            </div>
          )}
          {restaurant.closed && (
            <div className="restaurant-closed restaurant-detail">
              <h3>Closed: </h3>
              <div>{restaurant.closed}</div>
            </div>
          )}
          {restaurant.speciality && (
            <div className="restaurant-speciality restaurant-detail">
              <h3>Speciality of the restaurant: </h3>
              <div>{restaurant.speciality}</div>
            </div>
          )}
          {restaurant.takeAway !== null && (
            <div className="restaurant-takeAway restaurant-detail">
              <h3>Take Away: </h3>
              <div>
                {restaurant.takeAway !== null &&
                restaurant.takeAway !== undefined
                  ? restaurant.takeAway === true
                    ? "Yes"
                    : "No"
                  : ""}
              </div>
            </div>
          )}
          {restaurant.reserved !== null && (
            <div className="restaurant-reserved restaurant-detail">
              <h3>Reservation required: </h3>
              <div>
                {restaurant.reserved !== null &&
                restaurant.reserved !== undefined
                  ? restaurant.reserved === true
                    ? "Yes"
                    : "No"
                  : ""}
              </div>
            </div>
          )}
          {restaurant.notation && (
            <div className="restaurant-notation restaurant-detail">
              <h3>Notes: </h3>
              <div className="notation-text">{restaurant.notation}</div>
            </div>
          )}
        </div>

        <img
          className="details-illustration"
          src={"../../../src/assets/illustrations/restaurant.svg"}
        ></img>
      </div>

      {(restaurant.web || restaurant.phone || restaurant.email) && (
        <div className="restaurant-contact">
          {restaurant.web && (
            <div>
              {restaurant !== "" ? (
                !restaurant.web.startsWith("https://") &&
                !restaurant.web.startsWith("http://") &&
                restaurant.web !== null &&
                restaurant.web !== "" ? (
                  <a href={"https://" + restaurant.web} target="_blank">
                    <FontAwesomeIcon icon={faGlobe} className="icon" />
                    <div>Web:</div>
                    <div className="link">{restaurant.web}</div>
                  </a>
                ) : (
                  <a href={restaurant.web} target="_blank">
                    <FontAwesomeIcon icon={faGlobe} className="icon" />
                    <div>Web:</div>
                    <div className="link">{restaurant.web}</div>
                  </a>
                )
              ) : (
                <p></p>
              )}
            </div>
          )}
          {restaurant.phone && (
            <div>
              <a href={"tel:" + restaurant.phone}>
                <FontAwesomeIcon icon={faPhone} className="icon" />
                <div>Phone:</div>
                <div className="link">{restaurant.phone}</div>
              </a>
            </div>
          )}
          {restaurant.email && (
            <div>
              <a href={"mailto:" + restaurant.email}>
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <div>Email:</div>
                <div className="link">{restaurant.email}</div>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RestaurantCard;
