import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RestorationPage.css";
import Loading from "../../../components/Loading";
import Bar from "../../../components/Bar";
import * as api from "../../../api";
import AddRestorationCard from "../../../components/tripInformation/Restoration/AddRestorationCard";
import ScoreCard from "../../../components/score/ScoreCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faStar,
  faCirclePlus,
  faAngleLeft,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";

function RestorationPage() {
  const [restorationList, setRestorationList] = useState(null);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState(null);
  const { tripId } = useParams();
  const navigate = useNavigate();

  const loadRestorationList = async () => {
    const {
      success,
      result: restorationList,
      error,
    } = await api.getRestorationList(tripId);
    if (success) {
      setRestorationList(restorationList);
      setMessage(null);
    } else {
      setRestorationList(null);
      setMessage(error);
    }
  };

  const addRestoration = async (tripId, newRestorationData) => {
    const {
      success,
      result: added,
      error,
    } = await api.addRestoration(tripId, newRestorationData);
    if (success) {
      setRestorationList((restorationList) => [...restorationList, added]);
      setAdding(false);
      setMessage(null);
    } else {
      window.scrollTo(0, 0);
      setMessage(error);
    }
  };

  function addRestorationForm() {
    if (adding) {
      return (
        <AddRestorationCard
          onAdd={addRestoration}
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
    loadRestorationList();
    window.scrollTo(0, 0);
    document.body.style.overflow = "unset";
  }, []);

  if (restorationList === null) {
    return (
      <div>
        <Bar mode="login" />
        <Loading />
      </div>
    );
  }

  return (
    <div className="restoration-page">
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
          <h1 className="details-title list-page">RESTORATION</h1>
          <div>
            <div className="add-info-button" onClick={() => setAdding(true)}>
              <FontAwesomeIcon icon={faCirclePlus} className="icon" />
            </div>
          </div>
          <div className="info-list">
            {restorationList.map((restoration) => (
              <div
                className="info"
                key={restoration._id}
                onClick={() =>
                  navigate(`/trip/${tripId}/restoration/${restoration._id}`, {
                    replace: false,
                  })
                }
              >
                <h3 className="info-name">{restoration.name}</h3>
                <div className="info-main">{restoration.location}</div>
                {restoration.totalScore && restoration.totalScore.average ? (
                  <ScoreCard totalScore={restoration.totalScore} />
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
      {addRestorationForm()}
    </div>
  );
}

export default RestorationPage;
