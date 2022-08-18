import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AccommodationDetailsPage.css";
import * as api from "../../../api";
import Bar from "../../../components/Bar";
import CommentsCard from "../../../components/comment/CommentsCard";
import AccommodationCard from "../../../components/tripInformation/Accommodation/AccommodationCard";
import DeleteCard from "../../../components/DeleteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faAngleLeft,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

function AccommodationDetailsPage() {
  const [accommodation, setAccommodation] = useState("");
  const [deleting, setDeleting] = useState(false);
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

  useEffect(() => {
    loadAccommodation();
  }, [accommodationId]);

  return (
    <div className="accommodation-details-page">
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
        <div>{message}</div>
        <AccommodationCard accommodation={accommodation} />
        <div>{deleteButton()}</div>
        <CommentsCard
          tripId={tripId}
          componentId={accommodationId}
          component="accommodation"
        />
      </div>
    </div>
  );
}

export default AccommodationDetailsPage;
