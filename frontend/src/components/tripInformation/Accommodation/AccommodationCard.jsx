import React, { useEffect, useState } from "react";
import "./AccommodationCard.css";
import * as api from "../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import CommentsCard from "../../comment/CommentsCard";

function AccommodationCard({ accommodation }) {
  return (
    <div className="accommodation-card">
      <h1>Accommodation card</h1>
      <div className="accommodation-basic-info">
        <div className="accommodation-location accommodation-info">
          <h3>Location: </h3>
          <div>{accommodation.location}</div>
        </div>
        <div className="accommodation-description accommodation-info">
          <h3>Description: </h3>
          <div>{accommodation.description}</div>
        </div>
        <div className="accommodation-dates accommodation-info">
          <h3>Dates:</h3>
          {accommodation !== "" ? (
            <div>
              {accommodation.startDate.substring(
                0,
                accommodation.startDate.length - 14
              ) +
                " / " +
                accommodation.endDate.substring(
                  0,
                  accommodation.startDate.length - 14
                )}
            </div>
          ) : (
            <p></p>
          )}
        </div>
        <div className="accommodation-web accommodation-info">
          <h3>Web page: </h3>
          <div>
            {accommodation !== "" ? (
              !accommodation.web.startsWith("https://") &&
              !accommodation.web.startsWith("http://") &&
              accommodation.web !== null ? (
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
        <div className="accommodation-phone accommodation-info">
          <h3>Phone number: </h3>
          <div>{accommodation.phone}</div>
        </div>
        <div className="accommodation-email accommodation-info">
          <h3>Email: </h3>
          <div>{accommodation.email}</div>
        </div>
      </div>
    </div>
  );
}

export default AccommodationCard;
