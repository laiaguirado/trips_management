import React from "react";
import "./PlanCard.css";
import * as api from "../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function PlanCard({ plan, modifyPlanList }) {
  return (
    <div className="plan-card">
      <h1>Plan card</h1>
      <div className="plan-name plan-info">
        <h3>Name: </h3>
        <div>{plan.name} </div>
      </div>
      <div className="plan-location plan-info">
        <h3>Location: </h3>
        <div>{plan.location}</div>
      </div>
      <div className="plan-hours plan-info">
        <h3>Hours (opening - closing):</h3>
        <div>{plan.openingHour + "h / " + plan.closingHour + "h"}</div>
      </div>
      <div className="plan-phone plan-info">
        <h3>Closed: </h3>
        <div>{plan.closed}</div>
      </div>
      <div className="plan-duration plan-info">
        <h3>Duration: </h3>
        <div>{plan.duration}</div>
      </div>
      <div className="plan-price plan-info">
        <h3>Price: </h3>
        <div>Adults: {plan.priceAdultWithCurrency}</div>
        <div>Children: {plan.priceChildrenWithCurrency}</div>
      </div>
      <div className="plan-discount plan-info">
        <h3>Discount: </h3>
        <div>{plan.discount}</div>
      </div>
      <div className="plan-phone plan-info">
        <h3>Phone number: </h3>
        <div>{plan.phone}</div>
      </div>
      <div className="plan-email plan-info">
        <h3>Email: </h3>
        <div>{plan.email}</div>
      </div>
      <div className="plan-web plan-info">
        <h3>Web page: </h3>
        <div>
          {plan !== "" ? (
            !plan.web.startsWith("https://") &&
            !plan.web.startsWith("http://") &&
            plan.web !== null &&
            plan.web !== "" ? (
              <a href={"https://" + plan.web} target="_blank">
                {"https://" + plan.web}
              </a>
            ) : (
              <a href={plan.web} target="_blank">
                {plan.web}
              </a>
            )
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <div className="plan-notation plan-info">
        <h3>Notation: </h3>
        <div>{plan.notation}</div>
      </div>
    </div>
  );
}

export default PlanCard;
