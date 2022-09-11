import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TransportationPage.css";
import * as api from "../../../api";
import Bar from "../../../components/Bar";
import Loading from "../../../components/Loading";
import AddTransportationCard from "../../../components/tripInformation/Transportation/AddTransportationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faCirclePlus,
  faAngleLeft,
  faStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import ScoreCard from "../../../components/score/ScoreCard";

function TransportationPage() {
  const [transportationList, setTransportationList] = useState(null);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState(null);
  const { tripId } = useParams();
  const navigate = useNavigate();

  const loadTransportationList = async () => {
    const {
      success,
      result: transportationList,
      error,
    } = await api.getTransportationList(tripId);
    if (success) {
      setTransportationList(transportationList);
      setMessage(null);
    } else {
      setTransportationList(null);
      setMessage(error);
    }
  };

  const addTransportation = async (tripId, newTransportationData) => {
    const {
      success,
      result: added,
      error,
    } = await api.addTransportation(tripId, newTransportationData);
    if (success) {
      setTransportationList((transportationList) => [
        ...transportationList,
        added,
      ]);
      setAdding(false);
      setMessage(null);
    } else {
      window.scrollTo(0, 0);
      setMessage(error);
    }
  };

  function addTransportationForm() {
    if (adding) {
      return (
        <AddTransportationCard
          onAdd={addTransportation}
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
    loadTransportationList();
    window.scrollTo(0, 0);
    document.body.style.overflow = "unset";
  }, []);

  if (transportationList === null) {
    return (
      <div>
        <Bar mode="login" />
        <Loading />
      </div>
    );
  }

  return (
    <div className="transportation-page">
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
          <h1 className="details-title list-page">TRANSPORTATION</h1>
          <div>
            <div className="add-info-button" onClick={() => setAdding(true)}>
              <FontAwesomeIcon icon={faCirclePlus} className="icon" />
            </div>
          </div>
          <div className="info-list">
            {transportationList.map((transportation) => (
              <div
                className="info"
                key={transportation._id}
                onClick={() =>
                  navigate(
                    `/trip/${tripId}/transportation/${transportation._id}`,
                    {
                      replace: false,
                    }
                  )
                }
              >
                <h3 className="info-name">{transportation.name}</h3>
                <div className="info-main">{transportation.type}</div>
                {transportation.totalScore &&
                transportation.totalScore.average ? (
                  <ScoreCard totalScore={transportation.totalScore} />
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
      {addTransportationForm()}
    </div>
  );
}

export default TransportationPage;
