import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as api from "../../api";
import "./TransportationPage.css";
import Bar from "../../components/Bar";
import TransportationCard from "../../components/tripInformation/Transportation/TransportationCard";
import AddTransportationCard from "../../components/tripInformation/Transportation/AddTransportationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

function TransportationPage() {
  const [transportationList, setTransportationList] = useState([]);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState(null);
  const { tripId } = useParams();

  const loadTransportationList = async () => {
    const { success, transportationList, error } =
      await api.getTransportationList(tripId);
    if (success) {
      setTransportationList(transportationList);
      setMessage(null);
    } else {
      setTransportationList([]);
      setMessage(error);
    }
  };

  const addTransportation = async (tripId, newTransportationData) => {
    const { success, added, error } = await api.addTransportation(
      tripId,
      newTransportationData
    );
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
        <div
          className="add-transportation-button"
          onClick={() => setAdding(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
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
      <div className="flex-container">
        <div className="return-icon" onClick={() => window.history.go(-1)}>
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <div>{message}</div>
        <div>
          <h1>TRANSPORTATIONS</h1>
          <div>{addTransportationForm()}</div>
          <div className="transportation-list">
            {transportationList.map((transportation) => (
              <TransportationCard
                key={transportation._id}
                transportation={transportation}
                modifyTransportationList={setTransportationList}
              />
            ))}
          </div>
        </div>
      </div>
      <button onClick={() => editPage()}>Edit</button>
    </div>
  );
}

export default TransportationPage;
