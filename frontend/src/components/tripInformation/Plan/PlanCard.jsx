import React from "react";
import "./PlanCard.css";
import * as api from "../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function PlanCard({ plan, modifyPlanList }) {
  if (!plan.web.startsWith("https://") && !plan.web.startsWith("http://")) {
    plan.web = "https://" + plan.web;
  }

  const deletePlan = async (planId) => {
    const { success, error } = await api.deletePlan(planId);
    if (success) {
      modifyPlanList((prevList) => prevList.filter((t) => t._id !== planId));
    } else {
      setMessage(error);
    }
  };

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
        <div>
          {plan.openingHour.substring(0, plan.openingHour.length - 0) +
            " / " +
            plan.closingHour.substring(0, plan.closingHour.length - 0)}
        </div>
      </div>
      <div className="plan-phone plan-info">
        <h3>Closed: </h3>
        <div>{plan.closed}</div>
      </div>
      <div className="plan-duration plan-info">
        <h3>Duration: </h3>
        <div>{plan.duration}</div>
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
          <a href={plan.web} target="_blank">
            {plan.web}
          </a>
        </div>
      </div>
      <div className="plan-price plan-info">
        <h3>Price: </h3>
        <div>Adults: {plan.priceAdult}</div>
        <div>Children: {plan.priceChildren}</div>
      </div>
      <div className="plan-discount plan-info">
        <h3>Discount: </h3>
        <div>{plan.discount}</div>
      </div>
      <div className="plan-notation plan-info">
        <h3>Notation: </h3>
        <div>{plan.notation}</div>
      </div>
      <div
        className="delete-plan"
        onClick={() => {
          deletePlan(plan._id);
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} /> DELETE PLAN
      </div>
    </div>
  );
}

export default PlanCard;
