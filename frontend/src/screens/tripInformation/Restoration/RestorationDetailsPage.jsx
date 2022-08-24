import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RestorationDetailsPage.css";
import * as api from "../../../api";
import Bar from "../../../components/Bar";
import Loading from "../../../components/Loading";
import CommentsCard from "../../../components/comment/CommentsCard";
import RestorationCard from "../../../components/tripInformation/Restoration/RestorationCard";
import DeleteCard from "../../../components/DeleteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faAngleLeft,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

function RestorationDetailsPage() {
  const [restoration, setRestoration] = useState(null);
  const [deleting, setDeleting] = useState(false);
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

  function deleteButton() {
    if (deleting === false) {
      return (
        <div
          className="delete-restoration"
          onClick={() => {
            setDeleting(true);
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} /> DELETE RESTORATION
        </div>
      );
    } else {
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

  return (
    <div className="restoration-details-page">
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
        <RestorationCard restoration={restoration} />
        <div>{deleteButton()}</div>
        <CommentsCard
          tripId={tripId}
          componentId={restorationId}
          component="restoration"
        />
      </div>
    </div>
  );
}

export default RestorationDetailsPage;
