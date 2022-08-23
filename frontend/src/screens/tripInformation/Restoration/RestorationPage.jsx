import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./RestorationPage.css";
import * as api from "../../../api";
import Bar from "../../../components/Bar";
import RestorationCard from "../../../components/tripInformation/Restoration/RestorationCard";
import AddRestorationCard from "../../../components/tripInformation/Restoration/AddRestorationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCirclePlus,
  faAngleLeft,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

function RestorationPage() {
  const [restorationList, setRestorationList] = useState([]);
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
      setRestorationList([]);
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
      setMessage(error);
    }
  };

  function addRestorationForm() {
    if (adding) {
      return (
        <AddRestorationCard
          onAdd={addRestoration}
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
  }, []);

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
        <div className="edit-icon" onClick={() => editPage()}>
          <FontAwesomeIcon icon={faPen} size="2x" />{" "}
        </div>
        <div className="error">{message}</div>
        <div>
          <h1>RESTORATION</h1>
          <div>
            {addRestorationForm()}
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
                <div className="info-name">
                  <h3>{restoration.name}</h3>
                </div>
                <div>{restoration.kindOfFood}</div>
                <h4>Location:</h4>
                <div className="info-location">{restoration.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestorationPage;
