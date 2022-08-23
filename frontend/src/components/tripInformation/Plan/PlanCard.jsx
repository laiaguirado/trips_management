import React from "react";
import "./PlanCard.css";
import * as api from "../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function PlanCard({ plan, modifyPlanList }) {
  return (
    <div className="plan-card">
      <h1 className="details-title">Plan</h1>
      <div className="plan-info">
        <div className="plan-name plan-detail">
          <h3>Name: </h3>
          <div>{plan.name} </div>
        </div>
        <div className="plan-location plan-detail">
          <h3>Location: </h3>
          <div>{plan.location}</div>
        </div>
        <div className="plan-hours plan-detail">
          <h3>Hours (opening - closing):</h3>
          <div>
            {plan.openingHour !== "" && plan.closingHour !== ""
              ? plan.openingHour + "h / " + plan.closingHour + "h"
              : ""}
          </div>
        </div>
        <div className="plan-phone plan-detail">
          <h3>Closed: </h3>
          <div>{plan.closed}</div>
        </div>
        <div className="plan-duration plan-detail">
          <h3>Duration: </h3>
          <div>{plan.duration}</div>
        </div>
        <div className="plan-price plan-detail">
          <h3>Price: </h3>
          {plan.priceAdultWithCurrency !== "" &&
          plan.priceChildrenWithCurrency !== "" ? (
            <div>
              <h4>Adults: {plan.priceAdultWithCurrency}</h4>
              <h4>Children: {plan.priceChildrenWithCurrency}</h4>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="plan-discount plan-detail">
          <h3>Discount: </h3>
          <div>{plan.discount}</div>
        </div>
        <div className="plan-web plan-detail">
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
        <div className="plan-phone plan-detail">
          <h3>Phone number: </h3>
          <div>{plan.phone}</div>
        </div>
        <div className="plan-email plan-detail">
          <h3>Email: </h3>
          <div>
            <a href={"mailto:" + plan.email}>{plan.email}</a>
          </div>
        </div>
        <div className="plan-notation plan-detail">
          <h3>Notation: </h3>
          <div>{plan.notation}</div>
        </div>
      </div>
    </div>
  );
}

export default PlanCard;
