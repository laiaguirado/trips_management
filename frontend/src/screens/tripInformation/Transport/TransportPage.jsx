import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TransportPage.css";
import * as api from "../../../api";
import Bar from "../../../components/Bar";
import Loading from "../../../components/Loading";
import AddTransportCard from "../../../components/tripInformation/Transport/AddTransportCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faCirclePlus, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import ScoreCard from "../../../components/score/ScoreCard";

function TransportPage() {
  const [transportList, setTransportList] = useState(null);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState(null);
  const { tripId } = useParams();
  const navigate = useNavigate();

  const loadTransportList = async () => {
    const {
      success,
      result: transportList,
      error,
    } = await api.getTransportList(tripId);
    if (success) {
      setTransportList(transportList);
      setMessage(null);
    } else {
      setTransportList(null);
      setMessage(error);
    }
  };

  const addTransport = async (tripId, newTransportData) => {
    const {
      success,
      result: added,
      error,
    } = await api.addTransport(tripId, newTransportData);
    if (success) {
      setTransportList((transportList) => [...transportList, added]);
      setAdding(false);
      setMessage(null);
    } else {
      window.scrollTo(0, 0);
      setMessage(error);
    }
  };

  function addTransportForm() {
    if (adding) {
      return (
        <AddTransportCard
          onAdd={addTransport}
          message={message}
          adding={() => {
            setAdding(false);
            setMessage(null);
          }}
          tripId={tripId}
        />
      );
    }
  }

  useEffect(() => {
    loadTransportList();
    window.scrollTo(0, 0);
    document.body.style.overflow = "unset";
  }, []);

  if (transportList === null) {
    return (
      <div>
        <Bar mode="login" />
        <Loading />
      </div>
    );
  }

  return (
    <div className="transport-page">
      <Bar mode="login" />
      <div className="info-container">
        <div
          className="return-icon page-return-icon"
          onClick={() => navigate(`/trip/${tripId}`, { replace: false })}
        >
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <div className="error details-error">{message}</div>
        <div>
          <h1 className="details-title list-page">TRANSPORT</h1>
          <div>
            <div className="add-info-button" onClick={() => setAdding(true)}>
              <FontAwesomeIcon icon={faCirclePlus} className="icon" />
            </div>
          </div>
          <div className="info-list">
            {transportList.map((transport) => (
              <div
                className="info"
                key={transport._id}
                onClick={() =>
                  navigate(`/trip/${tripId}/transport/${transport._id}`, {
                    replace: false,
                  })
                }
              >
                <h3 className="info-name">{transport.name}</h3>
                <div className="info-main">{transport.type}</div>
                {transport.totalScore && transport.totalScore.average ? (
                  <ScoreCard totalScore={transport.totalScore} />
                ) : (
                  <div className="info-other-empty">
                    <FontAwesomeIcon icon={faStarRegular} className="icon" />
                    <FontAwesomeIcon icon={faStarRegular} className="icon" />
                    <FontAwesomeIcon icon={faStarRegular} className="icon" />
                    <FontAwesomeIcon icon={faStarRegular} className="icon" />
                    <FontAwesomeIcon icon={faStarRegular} className="icon" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      {addTransportForm()}
    </div>
  );
}

export default TransportPage;
