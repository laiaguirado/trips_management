import React from "react";
import "./PlanCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faGlobe,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

function PlanCard({ plan }) {
  document.body.style.overflow = "unset";
  function getHours() {
    const openingHour =
      plan.openingHour === null || plan.openingHour === ""
        ? "-"
        : plan.openingHour + "h";

    const closingHour =
      plan.closingHour === null || plan.closingHour === ""
        ? "-"
        : plan.closingHour + "h";

    return openingHour + " / " + closingHour;
  }

  function getPrice() {
    if (
      plan.priceChildrenWithCurrency === "" ||
      plan.priceChildrenWithCurrency === null
    ) {
      return (
        <div>
          <h4>
            Adults: <span>{plan.priceAdultWithCurrency}</span>
          </h4>
        </div>
      );
    }

    if (
      plan.priceAdultWithCurrency === "" ||
      plan.priceAdultWithCurrency === null
    ) {
      return (
        <div>
          <h4>
            Children: <span>{plan.priceChildrenWithCurrency}</span>
          </h4>
        </div>
      );
    }

    return (
      <div>
        <h4>
          Adults: <span>{plan.priceAdultWithCurrency}</span>
        </h4>
        <h4>
          Children: <span>{plan.priceChildrenWithCurrency}</span>
        </h4>
      </div>
    );
  }

  function getScore(rating) {
    return (
      <div className="rating">
        <h5>{rating}</h5>
        {rating < 1 ? (
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
        <span> {plan.totalScore[0].votes} votes</span>
      </div>
    );
  }
  return (
    <div className="plan-card">
      <h1 className="details-title">PLAN</h1>
      {plan.totalScore &&
        plan.totalScore[0] &&
        getScore(plan.totalScore[0].average)}
      <div className="plan-info">
        <div className="plan-name plan-detail">
          <h3>Name: </h3>
          <div>{plan.name} </div>
        </div>
        <div className="plan-location plan-detail">
          <h3>Location: </h3>
          <div>{plan.location}</div>
        </div>
        {(plan.openingHour || plan.closingHour) && (
          <div className="plan-hours plan-detail">
            <h3>Hours (opening - closing):</h3>
            <div>{getHours()}</div>
          </div>
        )}
        {plan.closed && (
          <div className="plan-phone plan-detail">
            <h3>Closed: </h3>
            <div>{plan.closed}</div>
          </div>
        )}
        {plan.duration && (
          <div className="plan-duration plan-detail">
            <h3>Duration: </h3>
            <div>{plan.duration}</div>
          </div>
        )}
        {(plan.priceAdultWithCurrency || plan.priceChildrenWithCurrency) && (
          <div className="plan-price plan-detail">
            <h3>Price: </h3>
            {getPrice()}
          </div>
        )}
        {plan.discount && (
          <div className="plan-discount plan-detail">
            <h3>Discount: </h3>
            <div>{plan.discount}</div>
          </div>
        )}
        {plan.notation && (
          <div className="plan-notation plan-detail">
            <h3>Notes: </h3>
            <div className="notation-text">{plan.notation}</div>
          </div>
        )}

        {(plan.web || plan.phone || plan.email) && (
          <div className="plan-contact">
            {plan.web && (
              <div>
                {plan !== "" ? (
                  !plan.web.startsWith("https://") &&
                  !plan.web.startsWith("http://") &&
                  plan.web !== null &&
                  plan.web !== "" ? (
                    <a href={"https://" + plan.web} target="_blank">
                      <FontAwesomeIcon icon={faGlobe} className="icon" />
                      <div>Web:</div>
                      <div className="link">{plan.web}</div>
                    </a>
                  ) : (
                    <a href={plan.web} target="_blank">
                      <FontAwesomeIcon icon={faGlobe} className="icon" />
                      <div>Web:</div>
                      <div className="link">{plan.web}</div>
                    </a>
                  )
                ) : (
                  <p></p>
                )}
              </div>
            )}
            {plan.phone && (
              <div>
                <a href={"tel:" + plan.phone}>
                  <FontAwesomeIcon icon={faPhone} className="icon" />
                  <div>Phone:</div>
                  <div className="link">{plan.phone}</div>
                </a>
              </div>
            )}
            {plan.email && (
              <div>
                <a href={"mailto:" + plan.email}>
                  <FontAwesomeIcon icon={faEnvelope} className="icon" />
                  <div>Email:</div>
                  <div className="link">{plan.email}</div>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PlanCard;
