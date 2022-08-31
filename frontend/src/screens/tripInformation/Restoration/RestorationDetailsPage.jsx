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
  const [rating, setRating] = useState(null);
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
      setRating(3); //doing
    } else {
      setRestoration(null);
      setMessage(error);
      setRating(null);
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

  const onEdit = async (restorationId, restorationData, restorationRating) => {
    const {
      success,
      result: edited,
      error,
    } = await api.updateRestoration(restorationId, restorationData);
    if (success) {
      setRestoration(edited);
      setEditing(false);
      setMessage(null);
      setRating(restorationRating);
    } else {
      setMessage(error);
    }
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
          <RestorationCard restoration={restoration} rating={rating} />
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
          rating={rating}
          onEdit={onEdit}
        />
      );
    }
  }

  return (
    <div className="restoration-details-page">
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

export default RestorationDetailsPage;
