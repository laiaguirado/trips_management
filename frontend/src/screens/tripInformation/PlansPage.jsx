import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Bar from "../../components/Bar";
import * as api from "../../api";
import "./PlansPage.css";
import PlanCard from "../../components/tripInformation/Plan/PlanCard";
import AddPlanCard from "../../components/tripInformation/Plan/AddPlanCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlus } from "@fortawesome/free-solid-svg-icons";

function PlansPage() {
  const [planList, setPlanList] = useState([]);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState(null);
  const { tripId } = useParams();

  const loadPlanList = async () => {
    const { success, planList, error } = await api.getPlanList(tripId);
    if (success) {
      setPlanList(planList);
      setMessage(null);
    } else {
      setPlanList([]);
      setMessage(error);
    }
  };

  const addPlan = async (tripId, newPlanData) => {
    const { success, added, error } = await api.addPlan(tripId, newPlanData);
    if (success) {
      setPlanList((planList) => [...planList, added]);
      setAdding(false);
      setMessage(null);
    } else {
      setMessage(error);
    }
  };

  function addPlanForm() {
    if (adding === false) {
      return (
        <div className="add-plan-button" onClick={() => setAdding(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      );
    } else {
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
  }, []);

  return (
    <div className="plan-page">
      <Bar mode="login" />
      <div className="flex-container">
        <div>{message}</div>
        <div>
          <h1>PLANS</h1>
          <div>{addPlanForm()}</div>
          <div className="plan-list">
            {planList.map((plan) => (
              <PlanCard
                key={plan._id}
                plan={plan}
                modifyPlanList={setPlanList}
              />
            ))}
          </div>
        </div>
      </div>
      <button onClick={() => window.history.go(-1)}>Go back</button>
      <button onClick={() => editPage()}>Edit</button>
    </div>
  );
}

export default PlansPage;
