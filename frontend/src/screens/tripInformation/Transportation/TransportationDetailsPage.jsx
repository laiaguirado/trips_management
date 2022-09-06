import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TransportationDetailsPage.css";
import * as api from "../../../api";
import Bar from "../../../components/Bar";
import Loading from "../../../components/Loading";
import CommentsCard from "../../../components/comment/CommentsCard";
import TransportationCard from "../../../components/tripInformation/Transportation/TransportationCard";
import EditTransportationCard from "../../../components/tripInformation/Transportation/EditTransportationCard.jsx";
import DeleteCard from "../../../components/DeleteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faAngleLeft,
  faPen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
//todo half board edit
//todo initial values of boolean checked in edit
//todo display G in rating field when edit
function TransportationDetailsPage() {
  const [transportation, setTransportation] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(null);
  const { tripId, transportationId } = useParams();
  const navigate = useNavigate();

  const loadTransportation = async () => {
    const {
      success,
      result: transportation,
      error,
    } = await api.getTransportation(transportationId);
    if (success) {
      setTransportation(transportation);
      setMessage(null);
    } else {
      setTransportation(null);
      setMessage(error);
    }
  };

  const deleteTransportation = async (transportationId) => {
    const { success, error } = await api.deleteTransportation(transportationId);
    if (success) {
      navigate(`/trip/${tripId}/transportation`, { replace: false });
    } else {
      setMessage(error);
    }
  };

  const onEdit = async (transportationId, transportationData, score) => {
    if (transportation.scores[0]) {
      if (score === "") {
        const {
          success: scoreSuccess,
          result: newScore,
          error: scoreError,
        } = await api.deleteScore(transportation.scores[0]._id);
        if (scoreSuccess) {
          setMessage(null);
        } else {
          setMessage(scoreError);
        }
      } else {
        transportationData.score = {
          _id: transportation.scores[0]._id,
          score: score,
        };
      }
    } else if (score !== "") {
      const {
        success: scoreSuccess,
        result: newScore,
        error: scoreError,
      } = await api.addScore(tripId, transportationId, "transportation", {
        value: score,
      });
      if (scoreSuccess) {
        setMessage(null);
      } else {
        setMessage(scoreError);
      }
    }

    const {
      success,
      result: edited,
      error,
    } = await api.updateTransportation(transportationId, transportationData);

    if (success) {
      setTransportation(edited);
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
          onDelete={() => deleteTransportation(transportationId)}
          deleting={() => setDeleting(false)}
          deleteType={"Transportation"}
        />
      );
    }
  }

  useEffect(() => {
    loadTransportation();
    window.scrollTo(0, 0);
  }, [transportationId]);

  if (transportation === null) {
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
          <TransportationCard transportation={transportation} />
          <div>
            {" "}
            <div
              className="delete-transportation"
              onClick={() => {
                setDeleting(true);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} /> DELETE TRANSPORTATION
            </div>
            {deleteButton()}
          </div>
          <CommentsCard
            tripId={tripId}
            componentId={transportationId}
            component="transportation"
          />
        </>
      );
    } else {
      return (
        <EditTransportationCard
          transportation={transportation}
          transportationId={transportationId}
          onEdit={onEdit}
        />
      );
    }
  }

  return (
    <div className="transportation-details-page">
      <Bar mode="login" />
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
      <div className="flex-container">
        <div className="error details-error">{message}</div>
        {showComponentMode()}
      </div>
    </div>
  );
}

export default TransportationDetailsPage;
