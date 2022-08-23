import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Bar from "../../../components/Bar";
import * as api from "../../../api";
import "./PlansPage.css";
import PlanCard from "../../../components/tripInformation/Plan/PlanCard";
import AddPlanCard from "../../../components/tripInformation/Plan/AddPlanCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCirclePlus,
  faAngleLeft,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

function PlansPage() {
  const [planList, setPlanList] = useState([]);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState(null);
  const { tripId } = useParams();
  const navigate = useNavigate();

  const loadPlanList = async () => {
    const { success, result: planList, error } = await api.getPlanList(tripId);
    if (success) {
      setPlanList(planList);
      setMessage(null);
    } else {
      setPlanList([]);
      setMessage(error);
    }
  };

  const addPlan = async (tripId, newPlanData) => {
    const {
      success,
      result: added,
      error,
    } = await api.addPlan(tripId, newPlanData);
    if (success) {
      setPlanList((planList) => [...planList, added]);
      setAdding(false);
      setMessage(null);
    } else {
      setMessage(error);
    }
  };

  function addPlanForm() {
    if (adding) {
      return (
        <AddPlanCard
          onAdd={addPlan}
          adding={() => {
            setAdding(false);
            setMessage(null);
          }}
          tripId={tripId}
        />
      );
    }
  }

  useEffect(() => {
    loadPlanList();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="plan-page">
      <Bar mode="login" />
      <div className="info-container">
        <div
          className="return-icon page-return-icon"
          onClick={() => navigate(`/trip/${tripId}`, { replace: false })}
        >
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <div className="edit-icon" onClick={() => editPage()}>
          <FontAwesomeIcon icon={faPen} size="2x" />{" "}
        </div>
        <div className="error">{message}</div>
        <div>
          <h1 className="details-title">PLANS</h1>
          <div>
            {addPlanForm()}
            <div className="add-info-button" onClick={() => setAdding(true)}>
              <FontAwesomeIcon icon={faCirclePlus} className="icon" />
            </div>
          </div>
          <div className="info-list">
            {planList.map((plan) => (
              <div
                className="info"
                key={plan._id}
                onClick={() =>
                  navigate(`/trip/${tripId}/plans/${plan._id}`, {
                    replace: false,
                  })
                }
              >
                <h3 className="info-name">{plan.name}</h3>
                <div className="info-main">{plan.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlansPage;
