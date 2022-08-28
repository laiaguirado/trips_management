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

  const onEdit = async (accommodationId, accommodationData) => {
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
      setMessage(error);
    }
  };

  const returnEditing = () => {
    setEditing(false);
    setMessage(null);
  };

  function deleteButton() {
    if (deleting === false) {
      return (
        <div
          className="delete-accommodation"
          onClick={() => {
            setDeleting(true);
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} /> DELETE ACCOMMODATION
        </div>
      );
    } else {
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
          <div>{deleteButton()}</div>
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
        <div className="error">{message}</div>
        {showComponentMode()}
      </div>
    </div>
  );
}

export default AccommodationDetailsPage;
