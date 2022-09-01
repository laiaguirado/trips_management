import React, { useEffect, useState } from "react";
import "./AccommodationCard.css";
import * as helper from "../../../helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faBed,
  faDog,
  faWifi,
  faPersonSwimming,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

function AccommodationCard({ accommodation, rating }) {
  document.body.style.overflow = "unset";

  return (
    <div className="accommodation-card">
      <h1 className="details-title">ACCOMMODATION</h1>
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
          {accommodation.startDate && (
            <div>{helper.localDate(accommodation.startDate)}</div>
          )}
          {accommodation.checkInHour && (
            <div>
              <span>Check In: </span>
              {accommodation.checkInHour + "h"}
            </div>
          )}
        </div>
        <div className="details-date-info">
          {accommodation.endDate && (
            <div>{helper.localDate(accommodation.endDate)}</div>
          )}
          {accommodation.checkOutHour && (
            <div>
              <span>Check Out: </span>
              {accommodation.checkOutHour + "h"}
            </div>
          )}
        </div>
      </div>
      <div className="details-icon">
        <div className="dot"></div>
        <div className="dotted-line"></div>
        <FontAwesomeIcon className="icon" icon={faBed} size="2x" />
        <div className="dotted-line"></div>
        <div className="dot"></div>
      </div>
      <div className="accommodation-info">
        <div className="accommodation-name accommodation-detail">
          <h3>Name: </h3>
          <div>{accommodation.name}</div>
        </div>
        {accommodation.type && (
          <div className="accommodation-type accommodation-detail">
            <h3>Accommodation type: </h3>
            <div>{accommodation.type}</div>
          </div>
        )}
        <div className="accommodation-location accommodation-detail">
          <h3>Location: </h3>
          <div>{accommodation.location}</div>
        </div>
        {accommodation.price && (
          <div className="accommodation-price accommodation-detail">
            <h3>Price: </h3>
            <div>
              {accommodation.priceWithCurrency !== ""
                ? accommodation.priceWithCurrency
                : ""}
            </div>
          </div>
        )}

        {(accommodation.petFriendly ||
          accommodation.internet ||
          accommodation.swimmingPool) && (
          <div className="accommodation-booleans accommodation-detail">
            <h3>Details: </h3>
            {accommodation.petFriendly && (
              <FontAwesomeIcon icon={faDog} className="icon" />
            )}
            {accommodation.internet && (
              <FontAwesomeIcon icon={faWifi} className="icon" />
            )}
            {accommodation.swimmingPool && (
              <FontAwesomeIcon icon={faPersonSwimming} className="icon" />
            )}
          </div>
        )}
        {accommodation.breakfast !== null && (
          <div className="accommodation-breakfast accommodation-detail">
            <h3>Breakfast included: </h3>
            <div>
              {accommodation.breakfast !== null &&
              accommodation.breakfast !== undefined
                ? accommodation.breakfast === true
                  ? "Yes"
                  : "No"
                : ""}
            </div>
          </div>
        )}
        {accommodation.board && (
          <div className="accommodation-board accommodation-detail">
            <h3>Board: </h3>
            <div>{accommodation.board}</div>
          </div>
        )}
        {accommodation.web && (
          <div className="accommodation-web accommodation-detail">
            <h3>Web page: </h3>
            <div>
              {accommodation !== "" ? (
                !accommodation.web.startsWith("https://") &&
                !accommodation.web.startsWith("http://") &&
                accommodation.web !== null &&
                accommodation.web !== "" ? (
                  <a href={"https://" + accommodation.web} target="_blank">
                    {"https://" + accommodation.web}
                  </a>
                ) : (
                  <a href={accommodation.web} target="_blank">
                    {accommodation.web}
                  </a>
                )
              ) : (
                <p></p>
              )}
            </div>
          </div>
        )}
        {accommodation.phone && (
          <div className="accommodation-phone accommodation-detail">
            <h3>Phone number: </h3>
            <div>{accommodation.phone}</div>
          </div>
        )}
        {accommodation.email && (
          <div className="accommodation-email accommodation-detail">
            <h3>Email: </h3>
            <div>
              <a href={"mailto:" + accommodation.email}>
                {accommodation.email}
              </a>
            </div>
          </div>
        )}
        {accommodation.notation && (
          <div className="accommodation-notation accommodation-detail">
            <h3>Notes: </h3>
            <div className="notation-text">{accommodation.notation}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccommodationCard;
