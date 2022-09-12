import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RestorationDetailsPage.css";
import * as api from "../../../api";
import Bar from "../../../components/Bar";
import Loading from "../../../components/Loading";
import CommentsCard from "../../../components/comment/CommentsCard";
import RestorationCard from "../../../components/tripInformation/Restoration/RestorationCard";
import EditRestorationCard from "../../../components/tripInformation/Restoration/EditRestorationCard.jsx";
import DeleteCard from "../../../components/DeleteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faAngleLeft,
  faPen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function RestorationDetailsPage() {
  const [restoration, setRestoration] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(null);
  const { tripId, restorationId } = useParams();
  const navigate = useNavigate();

  const loadRestoration = async () => {
    const {
      success,
      result: restoration,
      error,
    } = await api.getRestoration(restorationId);
    if (success) {
      setRestoration(restoration);
      setMessage(null);
    } else {
      setRestoration(null);
      setMessage(error);
    }
  };

  const deleteRestoration = async (restorationId) => {
    const { success, error } = await api.deleteRestoration(restorationId);
    if (success) {
      navigate(`/trip/${tripId}/restoration`, { replace: false });
    } else {
      setMessage(error);
    }
  };

  const onEdit = async (restorationId, restorationData, score) => {
    let idNewScoreAdded = null;
    if (restoration.scores[0]) {
      if (score === "") {
        const {
          success: scoreSuccess,
          result: newScore,
          error: scoreError,
        } = await api.deleteScore(restoration.scores[0]._id);
        if (scoreSuccess) {
          setMessage(null);
        } else {
          setMessage(scoreError);
        }
      } else {
        restorationData.score = {
          _id: restoration.scores[0]._id,
          score: score,
        };
      }
    } else if (score !== "") {
      const {
        success: scoreSuccess,
        result: newScore,
        error: scoreError,
      } = await api.addScore(tripId, restorationId, "restoration", {
        value: score,
      });
      if (scoreSuccess) {
        setMessage(null);
        idNewScoreAdded = newScore._id;
      } else {
        setMessage(scoreError);
      }
    }

    const {
      success,
      result: edited,
      error,
    } = await api.updateRestoration(restorationId, restorationData);
    if (success) {
      setRestoration(edited);
      setEditing(false);
      setMessage(null);
    } else {
      if (error.startsWith(" -  'email' is invalid.")) {
        setMessage("Not the correct email format");
      } else {
        setMessage(error);
      }
      if (idNewScoreAdded != null) {
        const {
          success: scoreSuccess,
          result: newScore,
          error: scoreError,
        } = await api.deleteScore(idNewScoreAdded);
      }
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
          onDelete={() => deleteRestoration(restorationId)}
          deleting={() => setDeleting(false)}
          deleteType={"restoration"}
        />
      );
    }
  }

  useEffect(() => {
    loadRestoration();
    window.scrollTo(0, 0);
  }, [restorationId]);

  if (restoration === null) {
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
          <RestorationCard restoration={restoration} />
          <div>
            <div
              className="delete-restoration"
              onClick={() => {
                setDeleting(true);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} /> DELETE RESTORATION
            </div>
            {deleteButton()}
          </div>
          <CommentsCard
            tripId={tripId}
            componentId={restorationId}
            component="restoration"
          />
        </>
      );
    } else {
      return (
        <EditRestorationCard
          restoration={restoration}
          restorationId={restorationId}
          onEdit={onEdit}
        />
      );
    }
  }

  return (
    <div className="restoration-details-page">
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

export default RestorationDetailsPage;
