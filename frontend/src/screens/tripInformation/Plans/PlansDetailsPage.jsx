import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PlansDetailsPage.css";
import * as api from "../../../api";
import Bar from "../../../components/Bar";
import Loading from "../../../components/Loading";
import CommentsCard from "../../../components/comment/CommentsCard";
import PlanCard from "../../../components/tripInformation/Plan/PlanCard";
import EditPlanCard from "../../../components/tripInformation/Plan/EditPlanCard.jsx";
import DeleteCard from "../../../components/DeleteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faAngleLeft,
  faPen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function PlansDetailsPage() {
  const [plan, setPlan] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState(null);
  const [editing, setEditing] = useState(false);
  const { tripId, planId } = useParams();
  const navigate = useNavigate();

  const loadPlan = async () => {
    const { success, result: plan, error } = await api.getPlan(planId);
    if (success) {
      setPlan(plan);
      setMessage(null);
    } else {
      setPlan(null);
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

  const onEdit = async (planId, planData) => {
    const {
      success,
      result: edited,
      error,
    } = await api.updatePlan(planId, planData);
    if (success) {
      setPlan(edited);
      setEditing(false);
      setMessage(null);
    } else {
      setMessage(error);
    }
    window.scrollTo(0, 0);
  };

  const returnEditing = () => {
    setEditing(false);
    setMessage(null);
  };

  function deleteButton() {
    if (deleting) {
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

  function showComponentMode() {
    if (!editing) {
      return (
        <>
          <PlanCard plan={plan} />
          <div>
            {" "}
            <div
              className="delete-plan"
              onClick={() => {
                setDeleting(true);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} /> DELETE PLAN
            </div>
            {deleteButton()}
          </div>
          <CommentsCard tripId={tripId} componentId={planId} component="plan" />
        </>
      );
    } else {
      return <EditPlanCard plan={plan} planId={planId} onEdit={onEdit} />;
    }
  }

  return (
    <div className="plans-details-page">
      <Bar mode="login" />
      <div className="flex-container">
        {!editing ? (
          <div
            className="return-icon page-return-icon"
            onClick={() => window.history.go(-1)}
          >
            <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
          </div>
        ) : (
          <div
            className="return-icon page-return-icon"
            onClick={() => returnEditing()}
          >
            <FontAwesomeIcon icon={faXmark} size="3x" />{" "}
          </div>
        )}
        {!editing && (
          <div className="edit-icon" onClick={() => setEditing(true)}>
            <FontAwesomeIcon icon={faPen} size="2x" />{" "}
          </div>
        )}
        <div className="error details-error">{message}</div>
        {showComponentMode()}
      </div>
    </div>
  );
}

export default PlansDetailsPage;
