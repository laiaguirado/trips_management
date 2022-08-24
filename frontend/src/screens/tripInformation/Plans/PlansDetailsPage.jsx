import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PlansDetailsPage.css";
import * as api from "../../../api";
import Bar from "../../../components/Bar";
import Loading from "../../../components/Loading";
import CommentsCard from "../../../components/comment/CommentsCard";
import PlanCard from "../../../components/tripInformation/Plan/PlanCard";
import DeleteCard from "../../../components/DeleteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faAngleLeft,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

function PlansDetailsPage() {
  const [plan, setPlan] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState(null);
  const { tripId, planId } = useParams();
  const navigate = useNavigate();

  const loadPlan = async () => {
    const { success, result: plan, error } = await api.getPlan(planId);
    if (success) {
      setPlan(plan);
      setMessage(null);
    } else {
      setMessage(error);
    }
  };

  const deletePlan = async (planId) => {
    const { success, error } = await api.deletePlan(planId);
    if (success) {
      navigate(`/trip/${tripId}/plans`, { replace: false });
    } else {
      setMessage(error);
    }
  };

  function deleteButton() {
    if (deleting === false) {
      return (
        <div
          className="delete-plan"
          onClick={() => {
            setDeleting(true);
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} /> DELETE PLAN
        </div>
      );
    } else {
      return (
        <DeleteCard
          onDelete={() => deletePlan(planId)}
          deleting={() => setDeleting(false)}
          deleteType={"Plan"}
        />
      );
    }
  }

  useEffect(() => {
    loadPlan();
    window.scrollTo(0, 0);
  }, [planId]);

  if (plan === null) {
    return (
      <div>
        <Bar mode="login" />
        <Loading />
      </div>
    );
  }

  return (
    <div className="plans-details-page">
      <Bar mode="login" />
      <div className="flex-container">
        <div
          className="return-icon page-return-icon"
          onClick={() => window.history.go(-1)}
        >
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <div className="edit-icon" onClick={() => window.history.go(-1)}>
          <FontAwesomeIcon icon={faPen} size="2x" />{" "}
        </div>
        <div className="error">{message}</div>
        <PlanCard plan={plan} />
        <div>{deleteButton()}</div>
        <CommentsCard tripId={tripId} componentId={planId} component="plan" />
      </div>
    </div>
  );
}

export default PlansDetailsPage;
