import React, { useEffect, useState } from "react";
import "./AccommodationCard.css";
import * as api from "../../../api";
import * as helper from "../../../helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import CommentsCard from "../../comment/CommentsCard";

function AccommodationCard({ accommodation }) {
  return (
    <div className="accommodation-card">
      <h1 className="details-title">Accommodation</h1>
      <div className="accommodation-info">
        <div className="accommodation-name accommodation-detail">
          <h3>Name: </h3>
          <div>{accommodation.name}</div>
        </div>
        <div className="accommodation-type accommodation-detail">
          <h3>Accommodation type: </h3>
          <div>{accommodation.type}</div>
        </div>
        <div className="accommodation-location accommodation-detail">
          <h3>Location: </h3>
          <div>{accommodation.location}</div>
        </div>
        <div className="accommodation-dates accommodation-detail">
          <h3>Dates:</h3>
          {accommodation !== "" &&
          accommodation.startDate !== null &&
          accommodation.endDate !== null ? (
            <div>
              {helper.changeDateOrder(
                accommodation.startDate.substring(
                  0,
                  accommodation.startDate.length - 14
                )
              ) +
                " / " +
                helper.changeDateOrder(
                  accommodation.endDate.substring(
                    0,
                    accommodation.startDate.length - 14
                  )
                )}
            </div>
          ) : (
            <p></p>
          )}
        </div>
        <div className="accommodation-checkHour accommodation-detail">
          <h3>Check In Hour / Check Out Hour:</h3>
          {accommodation !== "" &&
          accommodation.checkInHour !== "" &&
          accommodation.checkOutHour !== "" ? (
            <div>
              {accommodation.checkInHour +
                "h / " +
                accommodation.checkOutHour +
                "h"}
            </div>
          ) : (
            <p></p>
          )}
        </div>
        <div className="accommodation-price accommodation-detail">
          <h3>Price: </h3>
          <div>
            {accommodation.priceWithCurrency !== ""
              ? accommodation.priceWithCurrency
              : ""}
          </div>
        </div>
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
        <div className="accommodation-phone accommodation-detail">
          <h3>Phone number: </h3>
          <div>{accommodation.phone}</div>
        </div>
        <div className="accommodation-email accommodation-detail">
          <h3>Email: </h3>
          <div>
            <a href={"mailto:" + accommodation.email}>{accommodation.email}</a>
          </div>
        </div>
        <div className="accommodation-notation accommodation-detail">
          <h3>Notation: </h3>
          <div>{accommodation.notation}</div>
        </div>
      </div>
    </div>
  );
}

export default AccommodationCard;
