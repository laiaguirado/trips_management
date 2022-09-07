import React from "react";
import "./AccommodationCard.css";
import * as helper from "../../../helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faBed,
  faDog,
  faWifi,
  faPersonSwimming,
  faGlobe,
  faPhone,
  faEnvelope,
  faMugSaucer,
  faStarHalfStroke,
  faSlash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

function AccommodationCard({ accommodation }) {
  document.body.style.overflow = "unset";

  function getScore(score) {
    return (
      <div className="rating">
        <h5>{Math.round(score * 10) / 10}</h5>
        {0.5 <= score && score < 1 ? (
          <FontAwesomeIcon icon={faStarHalfStroke} className="icon" />
        ) : score < 1 ? (
          <FontAwesomeIcon icon={faStarRegular} className="icon" />
        ) : (
          <FontAwesomeIcon icon={faStar} className="icon" />
        )}
        {1.5 <= score && score < 2 ? (
          <FontAwesomeIcon icon={faStarHalfStroke} className="icon" />
        ) : score < 2 ? (
          <FontAwesomeIcon icon={faStarRegular} className="icon" />
        ) : (
          <FontAwesomeIcon icon={faStar} className="icon" />
        )}
        {2.5 <= score && score < 3 ? (
          <FontAwesomeIcon icon={faStarHalfStroke} className="icon" />
        ) : score < 3 ? (
          <FontAwesomeIcon icon={faStarRegular} className="icon" />
        ) : (
          <FontAwesomeIcon icon={faStar} className="icon" />
        )}
        {3.5 <= score && score < 4 ? (
          <FontAwesomeIcon icon={faStarHalfStroke} className="icon" />
        ) : score < 4 ? (
          <FontAwesomeIcon icon={faStarRegular} className="icon" />
        ) : (
          <FontAwesomeIcon icon={faStar} className="icon" />
        )}
        {4.5 <= score && score < 5 ? (
          <FontAwesomeIcon icon={faStarHalfStroke} className="icon" />
        ) : score < 5 ? (
          <FontAwesomeIcon icon={faStarRegular} className="icon" />
        ) : (
          <FontAwesomeIcon icon={faStar} className="icon" />
        )}
        <span> {accommodation.totalScore.votes} votes</span>
      </div>
    );
  }

  return (
    <div className="accommodation-card">
      <h1 className="details-title">ACCOMMODATION</h1>
      {accommodation.totalScore && getScore(accommodation.totalScore.average)}

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

      <div className="details-flex">
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
          {(accommodation.petFriendly !== null ||
            accommodation.internet !== null ||
            accommodation.swimmingPool !== null ||
            accommodation.breakfast !== null) && (
            <div className="accommodation-booleans accommodation-detail">
              <h3>Details: </h3>
              {accommodation.petFriendly !== null &&
                (accommodation.petFriendly === true ? (
                  <FontAwesomeIcon icon={faDog} className="icon" />
                ) : (
                  <div>
                    <FontAwesomeIcon
                      icon={faSlash}
                      className="icon slash"
                      style={{ color: "#AD3D25" }}
                    />
                    <FontAwesomeIcon icon={faDog} className="icon" />
                  </div>
                ))}
              {accommodation.internet !== null &&
                (accommodation.internet === true ? (
                  <FontAwesomeIcon icon={faWifi} className="icon" />
                ) : (
                  <div>
                    <FontAwesomeIcon
                      icon={faSlash}
                      className="icon slash"
                      style={{ color: "#AD3D25" }}
                    />
                    <FontAwesomeIcon icon={faWifi} className="icon" />
                  </div>
                ))}
              {accommodation.swimmingPool !== null &&
                (accommodation.swimmingPool === true ? (
                  <FontAwesomeIcon icon={faPersonSwimming} className="icon" />
                ) : (
                  <div>
                    <FontAwesomeIcon
                      icon={faSlash}
                      className="icon slash"
                      style={{ color: "#AD3D25" }}
                    />
                    <FontAwesomeIcon icon={faPersonSwimming} className="icon" />
                  </div>
                ))}
              {accommodation.breakfast !== null &&
                (accommodation.breakfast == true ? (
                  <FontAwesomeIcon icon={faMugSaucer} className="icon" />
                ) : (
                  <div>
                    <FontAwesomeIcon
                      icon={faSlash}
                      className="icon slash"
                      style={{ color: "#AD3D25" }}
                    />
                    <FontAwesomeIcon icon={faMugSaucer} className="icon" />
                  </div>
                ))}
            </div>
          )}
          {accommodation.board && (
            <div className="accommodation-board accommodation-detail">
              <h3>Board: </h3>
              <div>{accommodation.board}</div>
            </div>
          )}
          {accommodation.notation && (
            <div className="accommodation-notation accommodation-detail">
              <h3>Notes: </h3>
              <div className="notation-text">{accommodation.notation}</div>
            </div>
          )}

          {(accommodation.web ||
            accommodation.phone ||
            accommodation.email) && (
            <div className="accommodation-contact">
              {accommodation.web && (
                <div>
                  {accommodation !== "" ? (
                    !accommodation.web.startsWith("https://") &&
                    !accommodation.web.startsWith("http://") &&
                    accommodation.web !== null &&
                    accommodation.web !== "" ? (
                      <a href={"https://" + accommodation.web} target="_blank">
                        <FontAwesomeIcon icon={faGlobe} className="icon" />
                        <div>Web:</div>
                        <div className="link">{accommodation.web}</div>
                      </a>
                    ) : (
                      <a href={accommodation.web} target="_blank">
                        <FontAwesomeIcon icon={faGlobe} className="icon" />
                        <div>Web:</div>
                        <div className="link">{accommodation.web}</div>
                      </a>
                    )
                  ) : (
                    <p></p>
                  )}
                </div>
              )}
              {accommodation.phone && (
                <div>
                  <a href={"tel:" + accommodation.phone}>
                    <FontAwesomeIcon icon={faPhone} className="icon" />
                    <div>Phone:</div>
                    <div className="link">{accommodation.phone}</div>
                  </a>
                </div>
              )}
              {accommodation.email && (
                <div>
                  <a href={"mailto:" + accommodation.email}>
                    <FontAwesomeIcon icon={faEnvelope} className="icon" />
                    <div>Email:</div>
                    <div className="link">{accommodation.email}</div>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccommodationCard;
