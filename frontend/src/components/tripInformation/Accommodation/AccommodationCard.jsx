import React, { useEffect, useState } from "react";
import "./AccommodationCard.css";
import * as helper from "../../../helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

function AccommodationCard({ accommodation, rating }) {
  document.body.style.overflow = "unset";
  function getDates() {
    if (accommodation.startDate === null) {
      return "/ - " + helper.localDate(accommodation.endDate);
    }

    if (accommodation.endDate === null) {
      return helper.localDate(accommodation.startDate) + " - /";
    }

    return (
      helper.localDate(accommodation.startDate) +
      " - " +
      helper.localDate(accommodation.endDate)
    );
  }

  function getHours() {
    const checkIn =
      accommodation.checkInHour === null || accommodation.checkInHour === ""
        ? "-"
        : accommodation.checkInHour + "h";

    const checkOut =
      accommodation.checkOutHour === null || accommodation.checkOut === ""
        ? "-"
        : accommodation.checkOutHour + "h";

    return checkIn + " / " + checkOut;
  }

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
        {(accommodation.startDate || accommodation.endDate) && (
          <div className="accommodation-dates accommodation-detail">
            <h3>Dates:</h3>
            {accommodation !== "" &&
            (accommodation.startDate !== null ||
              accommodation.endDate !== null) ? (
              <div>{getDates()}</div>
            ) : (
              <p></p>
            )}
          </div>
        )}
        {(accommodation.checkInHour || accommodation.checkOutHour) && (
          <div className="accommodation-checkHour accommodation-detail">
            <h3>Check In Hour / Check Out Hour:</h3>
            {accommodation !== "" &&
            (accommodation.checkInHour !== "" ||
              accommodation.checkOutHour !== "") ? (
              <div>{getHours()}</div>
            ) : (
              <p></p>
            )}
          </div>
        )}
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
        {accommodation.petFriendly !== null && (
          <div className="accommodation-petFriendly accommodation-detail">
            <h3>Pet friendly: </h3>
            <div>
              {accommodation.petFriendly !== null &&
              accommodation.petFriendly !== undefined
                ? accommodation.petFriendly === true
                  ? "Yes"
                  : "No"
                : ""}
            </div>
          </div>
        )}
        {accommodation.internet !== null && (
          <div className="accommodation-internet accommodation-detail">
            <h3>Internet: </h3>
            <div>
              {accommodation.internet !== null &&
              accommodation.internet !== undefined
                ? accommodation.internet === true
                  ? "Yes"
                  : "No"
                : ""}
            </div>
          </div>
        )}
        {accommodation.swimmingPool !== null && (
          <div className="accommodation-swimmingPool accommodation-detail">
            <h3>Swimming pool: </h3>
            <div>
              {accommodation.swimmingPool !== null &&
              accommodation.swimmingPool !== undefined
                ? accommodation.swimmingPool === true
                  ? "Yes"
                  : "No"
                : ""}
            </div>
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
