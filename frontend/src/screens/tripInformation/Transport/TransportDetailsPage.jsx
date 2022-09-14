import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TransportDetailsPage.css";
import * as api from "../../../api";
import Bar from "../../../components/Bar";
import Loading from "../../../components/Loading";
import CommentsCard from "../../../components/comment/CommentsCard";
import TransportCard from "../../../components/tripInformation/Transport/TransportCard";
import EditTransportCard from "../../../components/tripInformation/Transport/EditTransportCard.jsx";
import DeleteCard from "../../../components/DeleteCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faAngleLeft,
  faPen,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function TransportDetailsPage() {
  const [transport, setTransport] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState(null);
  const { tripId, transportId } = useParams();
  const navigate = useNavigate();

  const loadTransport = async () => {
    const {
      success,
      result: transport,
      error,
    } = await api.getTransport(transportId);
    if (success) {
      setTransport(transport);
      setMessage(null);
    } else {
      setTransport(null);
      setMessage(error);
    }
  };

  const deleteTransport = async (transportId) => {
    const { success, error } = await api.deleteTransport(transportId);
    if (success) {
      navigate(`/trip/${tripId}/transport`, { replace: false });
    } else {
      setMessage(error);
    }
  };

  const onEdit = async (transportId, transportData, score) => {
    let idNewScoreAdded = null;
    if (transport.scores[0]) {
      if (score === "") {
        const {
          success: scoreSuccess,
          result: newScore,
          error: scoreError,
        } = await api.deleteScore(transport.scores[0]._id);
        if (scoreSuccess) {
          setMessage(null);
        } else {
          setMessage(scoreError);
        }
      } else {
        transportData.score = {
          _id: transport.scores[0]._id,
          score: score,
        };
      }
    } else if (score !== "") {
      const {
        success: scoreSuccess,
        result: newScore,
        error: scoreError,
      } = await api.addScore(tripId, transportId, "transport", {
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
    } = await api.updateTransport(transportId, transportData);

    if (success) {
      setTransport(edited);
      setEditing(false);
      setMessage(null);
    } else {
      setMessage(error);
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
          onDelete={() => deleteTransport(transportId)}
          deleting={() => setDeleting(false)}
          deleteType={"Transport"}
        />
      );
    }
  }

  useEffect(() => {
    loadTransport();
    window.scrollTo(0, 0);
  }, [transportId]);

  if (transport === null) {
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
          <TransportCard transport={transport} />
          <div>
            {" "}
            <div
              className="delete-transport"
              onClick={() => {
                setDeleting(true);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} /> DELETE TRANSPORT
            </div>
            {deleteButton()}
          </div>
          <CommentsCard
            tripId={tripId}
            componentId={transportId}
            component="transport"
          />
        </>
      );
    } else {
      return (
        <EditTransportCard
          transport={transport}
          transportId={transportId}
          onEdit={onEdit}
        />
      );
    }
  }

  return (
    <div className="transport-details-page">
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

export default TransportDetailsPage;
