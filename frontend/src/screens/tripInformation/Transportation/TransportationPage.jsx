import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TransportationPage.css";
import * as api from "../../../api";
import Bar from "../../../components/Bar";
import TransportationCard from "../../../components/tripInformation/Transportation/TransportationCard";
import AddTransportationCard from "../../../components/tripInformation/Transportation/AddTransportationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faAngleLeft,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

function TransportationPage() {
  const [transportationList, setTransportationList] = useState([]);
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
      setTransportationList([]);
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
      setMessage(error);
    }
  };

  function addTransportationForm() {
    if (adding === false) {
      return (
        <div className="add-info-button" onClick={() => setAdding(true)}>
          <FontAwesomeIcon icon={faCirclePlus} className="icon" />
        </div>
      );
    } else {
      return (
        <AddTransportationCard
          onAdd={addTransportation}
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
  }, []);

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
        <div className="edit-icon" onClick={() => editPage()}>
          <FontAwesomeIcon icon={faPen} size="2x" />{" "}
        </div>
        <div>{message}</div>
        <div>
          <h1>TRANSPORTATION</h1>
          <div>{addTransportationForm()}</div>
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
                <div className="info-name">
                  <h3>{transportation.name}</h3>
                </div>
                <h4>Transportation:</h4>
                <div className="info-location">{transportation.type}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransportationPage;
