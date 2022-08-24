import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TransportationDetailsPage.css";
import * as api from "../../../api";
import Bar from "../../../components/Bar";
import Loading from "../../../components/Loading";
import CommentsCard from "../../../components/comment/CommentsCard";
import TransportationCard from "../../../components/tripInformation/Transportation/TransportationCard";
import DeleteCard from "../../../components/DeleteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faAngleLeft,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

function TransportationDetailsPage() {
  const [transportation, setTransportation] = useState(null);
  const [deleting, setDeleting] = useState(false);
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

  function deleteButton() {
    if (deleting === false) {
      return (
        <div
          className="delete-transportation"
          onClick={() => {
            setDeleting(true);
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} /> DELETE TRANSPORTATION
        </div>
      );
    } else {
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

  return (
    <div className="transportation-details-page">
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
        <TransportationCard transportation={transportation} />
        <div>{deleteButton()}</div>
        <CommentsCard
          tripId={tripId}
          componentId={transportationId}
          component="transportation"
        />
      </div>
    </div>
  );
}

export default TransportationDetailsPage;
