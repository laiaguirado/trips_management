import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AccommodationDetailsPage.css";
import * as api from "../../../api";
import Bar from "../../../components/Bar";
import Loading from "../../../components/Loading";
import CommentsCard from "../../../components/comment/CommentsCard";
import AccommodationCard from "../../../components/tripInformation/Accommodation/AccommodationCard";
import EditAccommodationCard from "../../../components/tripInformation/Accommodation/EditAccommodationCard.jsx";
import DeleteCard from "../../../components/DeleteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faAngleLeft,
  faPen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function AccommodationDetailsPage() {
  const [accommodation, setAccommodation] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(null);
  const { tripId, accommodationId } = useParams();
  const navigate = useNavigate();

  const loadAccommodation = async () => {
    const {
      success,
      result: accommodation,
      error,
    } = await api.getAccommodation(accommodationId);
    if (success) {
      setAccommodation(accommodation);
      setMessage(null);
    } else {
      setAccommodation(null);
      setMessage(error);
    }
  };

  const deleteAccommodation = async (accommodationId) => {
    const { success, error } = await api.deleteAccommodation(accommodationId);
    if (success) {
      navigate(`/trip/${tripId}/accommodation`, { replace: false });
    } else {
      setMessage(error);
    }
  };

  const onEdit = async (accommodationId, accommodationData, score) => {
    let idNewScoreAdded = null;
    if (accommodation.scores[0]) {
      if (score === "") {
        const {
          success: scoreSuccess,
          result: newScore,
          error: scoreError,
        } = await api.deleteScore(accommodation.scores[0]._id);
        if (scoreSuccess) {
          setMessage(null);
        } else {
          setMessage(scoreError);
        }
      } else {
        accommodationData.score = {
          _id: accommodation.scores[0]._id,
          score: score,
        };
      }
    } else if (score !== "") {
      const {
        success: scoreSuccess,
        result: newScore,
        error: scoreError,
      } = await api.addScore(tripId, accommodationId, "accommodation", {
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
    } = await api.updateAccommodation(accommodationId, accommodationData);
    if (success) {
      setAccommodation(edited);
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
          onDelete={() => deleteAccommodation(accommodationId)}
          deleting={() => setDeleting(false)}
          deleteType={"Accommodation"}
        />
      );
    }
  }

  function showComponentMode() {
    if (!editing) {
      return (
        <>
          <AccommodationCard accommodation={accommodation} />
          <div>
            <div
              className="delete-accommodation"
              onClick={() => {
                setDeleting(true);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} /> DELETE ACCOMMODATION
            </div>
            {deleteButton()}
          </div>
          <CommentsCard
            tripId={tripId}
            componentId={accommodationId}
            component="accommodation"
          />
        </>
      );
    } else {
      return (
        <EditAccommodationCard
          accommodation={accommodation}
          accommodationId={accommodationId}
          onEdit={onEdit}
        />
      );
    }
  }

  useEffect(() => {
    loadAccommodation();
    window.scrollTo(0, 0);
  }, [accommodationId]);

  if (accommodation === null) {
    return (
      <div>
        <Bar mode="login" />
        <Loading />
      </div>
    );
  }

  return (
    <div className="accommodation-details-page">
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
        <div className="error  details-error">{message}</div>
        {showComponentMode()}
      </div>
    </div>
  );
}

export default AccommodationDetailsPage;
